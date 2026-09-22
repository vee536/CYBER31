-- CYBER31 optional cloud progress sync.
-- Run this once in your Supabase project's SQL editor.

create table if not exists cyber31_progress (
  device_id text primary key,
  completed_days integer[] not null default '{}',
  streak integer not null default 1,
  updated_at timestamptz not null default now()
);

alter table cyber31_progress enable row level security;

-- The app has no login system: every visitor is an anonymous device_id
-- generated client-side. Anyone can upsert/select using the anon key,
-- scoped only to whatever device_id they already know (their own).
create policy "Anyone can read their own progress row"
  on cyber31_progress for select
  using (true);

create policy "Anyone can upsert their own progress row"
  on cyber31_progress for insert
  with check (true);

create policy "Anyone can update their own progress row"
  on cyber31_progress for update
  using (true);
