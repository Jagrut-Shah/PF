-- Migration: Add Razorpay Payment Tracking to Orders Table
-- Date: 2026-08-26

alter table public.orders
  add column if not exists gift_wrapping_amount numeric default 0,
  add column if not exists billing_address jsonb default '{}'::jsonb,
  add column if not exists gift_details jsonb default '{}'::jsonb,
  add column if not exists free_sample jsonb default null,
  add column if not exists razorpay_order_id text default null,
  add column if not exists razorpay_payment_id text default null,
  add column if not exists razorpay_signature text default null,
  add column if not exists paid_at timestamp with time zone default null;

-- Performance indexes for fast idempotency lookups
create index if not exists idx_orders_razorpay_order_id on public.orders(razorpay_order_id);
create index if not exists idx_orders_razorpay_payment_id on public.orders(razorpay_payment_id);
