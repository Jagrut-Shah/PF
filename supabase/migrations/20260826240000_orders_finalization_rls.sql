-- Migration: Order Finalization & RLS Authorization Security Policies
-- Date: 2026-08-26

-- 1. Ensure RLS is enabled on public.orders
alter table public.orders enable row level security;

-- 2. Drop existing permissive policies if present to rebuild strict security
drop policy if exists "Users can view their own orders" on public.orders;
drop policy if exists "Users can insert their own orders" on public.orders;
drop policy if exists "Customers can view their own orders" on public.orders;
drop policy if exists "Anyone can insert checkout orders" on public.orders;

-- 3. Authenticated customers can view only their own orders
create policy "Customers can view their own orders"
  on public.orders
  for select
  using (
    (auth.uid() is not null and auth.uid() = user_id)
    or (auth.jwt()->>'email' is not null and email = auth.jwt()->>'email')
  );

-- 4. Anyone (guest or authenticated) can insert checkout orders
create policy "Anyone can insert checkout orders"
  on public.orders
  for insert
  with check (true);

-- 5. Add index on email and order_number for fast, secure lookup
create index if not exists idx_orders_user_id on public.orders(user_id);
create index if not exists idx_orders_email on public.orders(email);
create index if not exists idx_orders_order_number on public.orders(order_number);
