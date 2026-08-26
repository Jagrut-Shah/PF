-- Migration: Customer Saved Addresses & Checkout Integration
-- Date: 2026-08-26

-- 1. Create customer_addresses table
create table if not exists public.customer_addresses (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users(id) on delete cascade not null,
  full_name text not null,
  phone text not null,
  address_line_1 text not null,
  address_line_2 text,
  city text not null,
  state text not null,
  postal_code text not null,
  country text default 'India' not null,
  is_default boolean default false not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable Row Level Security (RLS)
alter table public.customer_addresses enable row level security;

-- Policies for RLS
do $$
begin
  if not exists (select 1 from pg_policies where tablename = 'customer_addresses' and policyname = 'Allow select own customer_addresses') then
    create policy "Allow select own customer_addresses" on public.customer_addresses for select using (auth.uid() = user_id);
  end if;

  if not exists (select 1 from pg_policies where tablename = 'customer_addresses' and policyname = 'Allow insert own customer_addresses') then
    create policy "Allow insert own customer_addresses" on public.customer_addresses for insert with check (auth.uid() = user_id);
  end if;

  if not exists (select 1 from pg_policies where tablename = 'customer_addresses' and policyname = 'Allow update own customer_addresses') then
    create policy "Allow update own customer_addresses" on public.customer_addresses for update using (auth.uid() = user_id);
  end if;

  if not exists (select 1 from pg_policies where tablename = 'customer_addresses' and policyname = 'Allow delete own customer_addresses') then
    create policy "Allow delete own customer_addresses" on public.customer_addresses for delete using (auth.uid() = user_id);
  end if;
end;
$$;

-- Function: Ensure single default address per user
create or replace function public.set_default_address(
  p_address_id uuid,
  p_user_id uuid default auth.uid()
)
returns void
language plpgsql
security definer set search_path = public
as $$
begin
  if p_user_id is null then
    raise exception 'Unauthenticated user';
  end if;

  -- Reset all user addresses default flag
  update public.customer_addresses
     set is_default = false,
         updated_at = now()
   where user_id = p_user_id;

  -- Set target address as default
  update public.customer_addresses
     set is_default = true,
         updated_at = now()
   where id = p_address_id
     and user_id = p_user_id;
end;
$$;
