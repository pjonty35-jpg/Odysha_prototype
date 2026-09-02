-- Odysha: privacy-first user data model.
-- Run this migration in Supabase SQL Editor or through the Supabase CLI.
-- All user-owned data is protected by Row Level Security (RLS).

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.saved_places (
  id bigint generated always as identity primary key,
  user_id uuid not null references auth.users(id) on delete cascade,
  place_id text not null,
  created_at timestamptz not null default now(),
  unique (user_id, place_id)
);

create table if not exists public.journeys (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  title text not null,
  preferences jsonb not null default '{}'::jsonb,
  itinerary jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Do not collect location by default. A safety request is optional, purpose
-- limited, and designed for short retention. Set a deletion job before launch.
create table if not exists public.safety_requests (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete set null,
  concern_type text not null,
  consented_location jsonb,
  status text not null default 'submitted' check (status in ('submitted', 'closed')),
  created_at timestamptz not null default now(),
  closed_at timestamptz
);

alter table public.profiles enable row level security;
alter table public.saved_places enable row level security;
alter table public.journeys enable row level security;
alter table public.safety_requests enable row level security;

create policy "Users read their own profile" on public.profiles for select using ((select auth.uid()) = id);
create policy "Users update their own profile" on public.profiles for update using ((select auth.uid()) = id) with check ((select auth.uid()) = id);
create policy "Users read their own saved places" on public.saved_places for select using ((select auth.uid()) = user_id);
create policy "Users add their own saved places" on public.saved_places for insert with check ((select auth.uid()) = user_id);
create policy "Users remove their own saved places" on public.saved_places for delete using ((select auth.uid()) = user_id);
create policy "Users read their own journeys" on public.journeys for select using ((select auth.uid()) = user_id);
create policy "Users add their own journeys" on public.journeys for insert with check ((select auth.uid()) = user_id);
create policy "Users update their own journeys" on public.journeys for update using ((select auth.uid()) = user_id) with check ((select auth.uid()) = user_id);
create policy "Users delete their own journeys" on public.journeys for delete using ((select auth.uid()) = user_id);
create policy "Users submit their own safety request" on public.safety_requests for insert with check ((select auth.uid()) = user_id);
create policy "Users read their own safety requests" on public.safety_requests for select using ((select auth.uid()) = user_id);

-- Automatically make a minimal profile. Do not copy arbitrary user metadata
-- into privileged fields: users can edit their own metadata.
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles (id, full_name)
  values (new.id, nullif(trim(new.raw_user_meta_data ->> 'full_name'), ''))
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
