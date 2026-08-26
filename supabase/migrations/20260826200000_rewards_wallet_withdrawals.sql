-- Migration: Rewards Wallet & Manual Withdrawal Requests
-- Date: 2026-08-26

-- 1. Create withdrawal_requests table
create table if not exists public.withdrawal_requests (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users(id) on delete cascade not null,
  amount numeric(10, 2) not null check (amount > 0),
  payout_method text not null check (payout_method in ('upi', 'bank')),
  payout_details jsonb not null,
  status text default 'pending' not null check (status in ('pending', 'processing', 'completed', 'failed', 'cancelled')),
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  processed_at timestamp with time zone,
  notes text
);

-- Enable Row Level Security (RLS)
alter table public.withdrawal_requests enable row level security;

-- RLS Policy: Customers can only read their own withdrawal requests
create policy "Allow select own withdrawal_requests"
  on public.withdrawal_requests
  for select
  using (auth.uid() = user_id);

-- Function: Process withdrawal request securely with balance check and immediate reservation
create or replace function public.request_withdrawal(
  p_amount numeric,
  p_payout_method text,
  p_payout_details jsonb,
  p_user_id uuid default auth.uid()
)
returns jsonb
language plpgsql
security definer set search_path = public
as $$
declare
  v_total_available numeric(10, 2) := 0.00;
  v_total_reserved numeric(10, 2) := 0.00;
  v_net_withdrawable numeric(10, 2) := 0.00;
  v_withdrawal_id uuid;
begin
  if p_user_id is null then
    return jsonb_build_object('success', false, 'reason', 'unauthenticated');
  end if;

  if p_amount is null or p_amount <= 0 then
    return jsonb_build_object('success', false, 'reason', 'invalid_amount');
  end if;

  if p_amount < 100.00 then
    return jsonb_build_object('success', false, 'reason', 'minimum_threshold_not_met', 'minimum_amount', 100.00);
  end if;

  if p_payout_method not in ('upi', 'bank') then
    return jsonb_build_object('success', false, 'reason', 'invalid_payout_method');
  end if;

  -- 1. Calculate total earned available rewards
  select coalesce(sum(amount), 0.00)
    into v_total_available
    from public.rewards
   where user_id = p_user_id
     and status = 'available';

  -- 2. Calculate total reserved or completed withdrawals
  select coalesce(sum(amount), 0.00)
    into v_total_reserved
    from public.withdrawal_requests
   where user_id = p_user_id
     and status in ('pending', 'processing', 'completed');

  v_net_withdrawable := v_total_available - v_total_reserved;

  if p_amount > v_net_withdrawable then
    return jsonb_build_object(
      'success', false,
      'reason', 'insufficient_balance',
      'withdrawable_balance', v_net_withdrawable
    );
  end if;

  -- 3. Reserve amount immediately by inserting pending withdrawal request
  insert into public.withdrawal_requests (
    user_id,
    amount,
    payout_method,
    payout_details,
    status
  )
  values (
    p_user_id,
    p_amount,
    p_payout_method,
    p_payout_details,
    'pending'
  )
  returning id into v_withdrawal_id;

  return jsonb_build_object(
    'success', true,
    'withdrawal_id', v_withdrawal_id,
    'amount', p_amount,
    'remaining_balance', v_net_withdrawable - p_amount
  );
end;
$$;
