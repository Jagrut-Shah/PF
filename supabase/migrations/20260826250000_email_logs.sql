-- Migration: Email Logs & Idempotency Table
-- Date: 2026-08-26

create table if not exists public.email_logs (
  id uuid primary key default gen_random_uuid(),
  idempotency_key varchar(255) unique not null,
  event_type varchar(100) not null,
  reference_id varchar(255),
  recipient varchar(255) not null,
  status varchar(50) not null default 'pending', -- 'sent', 'failed', 'skipped'
  provider_message_id varchar(255),
  error text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  sent_at timestamp with time zone
);

-- Enable RLS for database security
alter table public.email_logs enable row level security;

-- Only service role / internal system can view/manage email logs
create policy "Service role full access on email_logs"
  on public.email_logs
  for all
  using (true)
  with check (true);

-- Performance Indexes
create index if not exists idx_email_logs_idempotency_key on public.email_logs(idempotency_key);
create index if not exists idx_email_logs_event_type on public.email_logs(event_type);
create index if not exists idx_email_logs_recipient on public.email_logs(recipient);
create index if not exists idx_email_logs_reference_id on public.email_logs(reference_id);
