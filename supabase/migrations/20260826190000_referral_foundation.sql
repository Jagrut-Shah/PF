-- Migration: Referral & Rewards Foundation
-- Date: 2026-08-26

-- 1. Create referral_codes table
create table if not exists public.referral_codes (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users(id) on delete cascade unique not null,
  code text unique not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 2. Create orders table (compatible foundation)
create table if not exists public.orders (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users(id) on delete set null,
  email text not null,
  subtotal numeric(10, 2) not null,
  discount_amount numeric(10, 2) default 0.00 not null,
  total_amount numeric(10, 2) not null,
  referral_code text,
  status text default 'pending' not null check (status in ('pending', 'qualifying', 'completed', 'cancelled', 'refunded')),
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 3. Create referrals table
create table if not exists public.referrals (
  id uuid default gen_random_uuid() primary key,
  referrer_id uuid references auth.users(id) on delete cascade not null,
  referral_code text not null,
  order_id uuid unique references public.orders(id) on delete set null,
  referred_email text,
  referred_user_id uuid references auth.users(id) on delete set null,
  status text default 'pending' not null check (status in ('pending', 'qualifying', 'completed', 'cancelled')),
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  qualifying_at timestamp with time zone
);

-- 4. Create rewards table (Ledger)
create table if not exists public.rewards (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users(id) on delete cascade not null,
  referral_id uuid unique references public.referrals(id) on delete set null,
  amount numeric(10, 2) not null default 100.00,
  type text default 'cash' not null check (type in ('cash', 'credit')),
  status text default 'pending' not null check (status in ('pending', 'available', 'withdrawn', 'cancelled')),
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  available_at timestamp with time zone
);

-- Enable RLS on all tables
alter table public.referral_codes enable row level security;
alter table public.orders enable row level security;
alter table public.referrals enable row level security;
alter table public.rewards enable row level security;

-- RLS Policies
-- referral_codes: read own code or public read for code validation
create policy "Allow select referral_codes"
  on public.referral_codes
  for select
  using (true);

-- orders: read own orders
create policy "Allow select own orders"
  on public.orders
  for select
  using (auth.uid() = user_id or email = (auth.jwt()->>'email'));

-- referrals: read own referrals
create policy "Allow select own referrals"
  on public.referrals
  for select
  using (auth.uid() = referrer_id);

-- rewards: read own rewards ledger
create policy "Allow select own rewards"
  on public.rewards
  for select
  using (auth.uid() = user_id);

-- Function 1: Generate unique referral code for a user (ELAVA + 6 chars)
create or replace function public.generate_referral_code(p_user_id uuid)
returns text
language plpgsql
security definer set search_path = public
as $$
declare
  v_code text;
  v_exists boolean;
  v_chars text := '23456789ABCDEFGHJKLMNPQRSTUVWXYZ';
  v_i integer;
begin
  -- Check if user already has a code
  select code into v_code from public.referral_codes where user_id = p_user_id;
  if v_code is not null then
    return v_code;
  end if;

  loop
    v_code := 'ELAVA';
    for v_i in 1..6 loop
      v_code := v_code || substr(v_chars, floor(random() * length(v_chars) + 1)::integer, 1);
    end loop;

    select exists(select 1 from public.referral_codes where code = v_code) into v_exists;
    if not v_exists then
      insert into public.referral_codes (user_id, code)
      values (p_user_id, v_code)
      on conflict (user_id) do update set user_id = excluded.user_id
      returning code into v_code;
      
      return v_code;
    end if;
  end loop;
end;
$$;

-- Function 2: Get or create referral code for authenticated user
create or replace function public.get_or_create_referral_code(p_user_id uuid default auth.uid())
returns text
language plpgsql
security definer set search_path = public
as $$
declare
  v_code text;
begin
  if p_user_id is null then
    raise exception 'User ID is required.';
  end if;

  select code into v_code from public.referral_codes where user_id = p_user_id;
  if v_code is null then
    v_code := public.generate_referral_code(p_user_id);
  end if;

  return v_code;
end;
$$;

-- Function 3: Validate referral code & prevent self-referral
create or replace function public.validate_referral_code(p_code text, p_user_id uuid default auth.uid())
returns jsonb
language plpgsql
security definer set search_path = public
as $$
declare
  v_clean_code text;
  v_referrer_id uuid;
begin
  if p_code is null or trim(p_code) = '' then
    return jsonb_build_object('is_valid', false, 'reason', 'empty_code');
  end if;

  v_clean_code := upper(trim(p_code));

  select user_id into v_referrer_id from public.referral_codes where code = v_clean_code;

  if v_referrer_id is null then
    return jsonb_build_object('is_valid', false, 'reason', 'invalid_code');
  end if;

  -- Anti-abuse: Self-referral check
  if p_user_id is not null and p_user_id = v_referrer_id then
    return jsonb_build_object('is_valid', false, 'reason', 'self_referral');
  end if;

  return jsonb_build_object(
    'is_valid', true,
    'code', v_clean_code,
    'discount_amount', 200.00,
    'referrer_id', v_referrer_id
  );
end;
$$;

-- Function 4: Process referred order & create pending reward (₹100)
create or replace function public.process_referred_order(
  p_order_id uuid,
  p_referral_code text,
  p_referred_email text,
  p_referred_user_id uuid default null
)
returns jsonb
language plpgsql
security definer set search_path = public
as $$
declare
  v_clean_code text;
  v_referrer_id uuid;
  v_referral_id uuid;
  v_reward_id uuid;
begin
  v_clean_code := upper(trim(p_referral_code));

  -- Validate referral code owner
  select user_id into v_referrer_id from public.referral_codes where code = v_clean_code;

  if v_referrer_id is null then
    return jsonb_build_object('success', false, 'reason', 'invalid_code');
  end if;

  -- Anti-self-referral check
  if p_referred_user_id is not null and p_referred_user_id = v_referrer_id then
    return jsonb_build_object('success', false, 'reason', 'self_referral');
  end if;

  -- Create referral record
  insert into public.referrals (
    referrer_id,
    referral_code,
    order_id,
    referred_email,
    referred_user_id,
    status
  )
  values (
    v_referrer_id,
    v_clean_code,
    p_order_id,
    p_referred_email,
    p_referred_user_id,
    'pending'
  )
  on conflict (order_id) do nothing
  returning id into v_referral_id;

  if v_referral_id is null then
    select id into v_referral_id from public.referrals where order_id = p_order_id;
  end if;

  -- Create pending reward record (₹100)
  if v_referral_id is not null then
    insert into public.rewards (
      user_id,
      referral_id,
      amount,
      type,
      status
    )
    values (
      v_referrer_id,
      v_referral_id,
      100.00,
      'cash',
      'pending'
    )
    on conflict (referral_id) do nothing
    returning id into v_reward_id;
  end if;

  return jsonb_build_object(
    'success', true,
    'referral_id', v_referral_id,
    'reward_id', v_reward_id
  );
end;
$$;

-- Trigger to automatically generate referral code when new user signs up
create or replace function public.handle_new_user_referral_code()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  perform public.generate_referral_code(new.id);
  return new;
end;
$$;

create or replace trigger on_auth_user_created_referral_code
  after insert on auth.users
  for each row execute procedure public.handle_new_user_referral_code();
