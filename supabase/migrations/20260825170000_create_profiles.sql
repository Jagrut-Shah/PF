-- Create profiles table referencing auth.users
create table if not exists public.profiles (
  id uuid references auth.users on delete cascade primary key,
  name text,
  email text,
  phone text,
  avatar_url text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable Row Level Security (RLS)
alter table public.profiles enable row level security;

-- RLS Policies
create policy "Allow select own profile"
  on public.profiles
  for select
  using (auth.uid() = id);

create policy "Allow update own profile"
  on public.profiles
  for update
  using (auth.uid() = id)
  with check (auth.uid() = id);

-- Trigger to automatically create a profile record when a new user signs up
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles (id, email, name, phone, avatar_url)
  values (
    new.id,
    new.email,
    coalesce(new.raw_user_meta_data->>'name', new.raw_user_meta_data->>'full_name'),
    new.phone,
    new.raw_user_meta_data->>'avatar_url'
  )
  on conflict (id) do nothing;
  return new;
end;
$$;

create or replace trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- Trigger to enforce update security (prevent changing ID, Email, or Created At)
create or replace function public.handle_update_profile()
returns trigger
language plpgsql
security definer
as $$
begin
  if new.id <> old.id then
    raise exception 'Cannot modify user ID.';
  end if;
  if new.email <> old.email then
    raise exception 'Email changes must be done via Supabase Auth.';
  end if;
  if new.created_at <> old.created_at then
    raise exception 'Cannot modify created_at timestamp.';
  end if;

  new.updated_at = now();
  return new;
end;
$$;

create or replace trigger on_profile_updated
  before update on public.profiles
  for each row execute procedure public.handle_update_profile();
