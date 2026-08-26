-- Migration: Customer Orders Schema Enhancements & RLS
-- Date: 2026-08-26

-- Add order_number, items, payment_status, shipping_address to public.orders table
alter table public.orders
  add column if not exists order_number text,
  add column if not exists items jsonb default '[]'::jsonb,
  add column if not exists payment_status text default 'paid',
  add column if not exists shipping_address jsonb default '{}'::jsonb;

-- Enable Row Level Security (RLS) on public.orders
alter table public.orders enable row level security;

-- Create RLS policy allowing customers to select their own orders only
do $$
begin
  if not exists (
    select 1 from pg_policies
    where tablename = 'orders' and policyname = 'Allow select own orders'
  ) then
    create policy "Allow select own orders"
      on public.orders
      for select
      using (auth.uid() = user_id);
  end if;
end;
$$;
