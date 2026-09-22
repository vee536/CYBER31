-- CYBER31 optional cloud progress sync + authenticated accounts.
-- Safe to run against a fresh project, and safe to re-run against a
-- project that already has the original device_id-only version of
-- this table (every step below is idempotent).

create table if not exists cyber31_progress (
  device_id text primary key,
  completed_days integer[] not null default '{}',
  streak integer not null default 1,
  updated_at timestamptz not null default now()
);

-- 1. Give the table a synthetic primary key (`id`) instead of `device_id`,
--    so a row can be keyed by device_id OR user_id OR both.
alter table cyber31_progress add column if not exists id uuid default gen_random_uuid();
update cyber31_progress set id = gen_random_uuid() where id is null;
alter table cyber31_progress alter column id set not null;

do $$
begin
  if exists (
    select 1 from information_schema.table_constraints
    where table_name = 'cyber31_progress' and constraint_name = 'cyber31_progress_pkey'
  ) then
    alter table cyber31_progress drop constraint cyber31_progress_pkey;
  end if;
end $$;

alter table cyber31_progress add constraint cyber31_progress_pkey primary key (id);

-- 2. device_id is no longer the primary key, so it can now be nullable
--    (a purely account-based row has no device_id of its own).
alter table cyber31_progress alter column device_id drop not null;
create unique index if not exists cyber31_progress_device_id_key on cyber31_progress (device_id) where device_id is not null;

-- 3. Add authenticated-user support.
alter table cyber31_progress add column if not exists user_id uuid references auth.users(id) on delete cascade;
create unique index if not exists cyber31_progress_user_id_key on cyber31_progress (user_id) where user_id is not null;

alter table cyber31_progress enable row level security;

-- Drop old/previous policies before recreating (Postgres has no
-- "create policy if not exists").
drop policy if exists "Anyone can read their own progress row" on cyber31_progress;
drop policy if exists "Anyone can upsert their own progress row" on cyber31_progress;
drop policy if exists "Anyone can update their own progress row" on cyber31_progress;
drop policy if exists "Anon device rows are read/write by anyone" on cyber31_progress;
drop policy if exists "Users can read their own progress row" on cyber31_progress;
drop policy if exists "Users can insert their own progress row" on cyber31_progress;
drop policy if exists "Users can update their own progress row" on cyber31_progress;

-- Anonymous (device-based) rows: there's no way to verify device
-- ownership without an account, so any anon request may read/write any
-- device_id row that has no user_id attached yet (same trust model as
-- before: not sensitive data, and each visitor only knows their own
-- randomly generated device_id).
create policy "Anon device rows are read/write by anyone"
  on cyber31_progress for all
  to anon
  using (user_id is null)
  with check (user_id is null);

-- Authenticated rows: only the owning account can read/write its row.
create policy "Users can read their own progress row"
  on cyber31_progress for select
  to authenticated
  using (auth.uid() = user_id);

create policy "Users can insert their own progress row"
  on cyber31_progress for insert
  to authenticated
  with check (auth.uid() = user_id);

create policy "Users can update their own progress row"
  on cyber31_progress for update
  to authenticated
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);
