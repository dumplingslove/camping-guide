-- Supabase schema for camping-guide cloud sync
-- Run this once in the Supabase SQL Editor (or via psql).
-- Tables: profiles, visited_records, camp_notes, favorites, shared_notes
--
-- Access model (2026-09-13):
--   * profiles: any authenticated user can read; each user only writes their own row.
--   * visited_records / camp_notes: the two allowlisted family emails
--     (darancai@gmail.com, nckuang123@gmail.com) can READ each other's rows;
--     everyone else (and anyone for writes) is strictly limited to their own rows.
--   * favorites / shared_notes: strictly owner-only. Shared note snapshots are
--     read anonymously ONLY through the get_shared_note RPC (token-gated),
--     never through a broad table policy.

-- 0. Profiles (归属标签: 互可见的两个账号互相显示谁写的)
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text not null,
  display_name text not null,
  updated_at timestamptz not null default now()
);
alter table public.profiles enable row level security;
drop policy if exists "Authenticated can read all profiles" on public.profiles;
drop policy if exists "Allowlisted emails read all profiles" on public.profiles;
create policy "Allowlisted emails read all profiles"
  on public.profiles for select to authenticated
  using (auth.uid() = id
         or auth.jwt() ->> 'email' in ('darancai@gmail.com', 'nckuang123@gmail.com'));
drop policy if exists "Users manage own profile" on public.profiles;
create policy "Users manage own profile"
  on public.profiles for all to authenticated
  using (auth.uid() = id)
  with check (auth.uid() = id);

-- 1. Visited records (去过打卡)
create table if not exists public.visited_records (
  id bigint generated always as identity primary key,
  user_id uuid not null references auth.users(id) on delete cascade,
  campground_id integer not null,
  start_date text not null,
  end_date text,
  sites text not null default '',
  notes text,
  created_at timestamptz not null default now(),
  unique (user_id, campground_id, start_date, sites)
);
alter table public.visited_records enable row level security;
-- Reads: own rows + the two allowlisted family emails see each other's rows.
drop policy if exists "Users manage own visited records" on public.visited_records;
drop policy if exists "Authenticated can read all visited records" on public.visited_records;
drop policy if exists "Allowlisted emails read all visited records" on public.visited_records;
create policy "Allowlisted emails read all visited records"
  on public.visited_records for select to authenticated
  using (auth.uid() = user_id
         or auth.jwt() ->> 'email' in ('darancai@gmail.com', 'nckuang123@gmail.com'));
-- Writes: strictly your own rows.
drop policy if exists "Users insert own visited records" on public.visited_records;
create policy "Users insert own visited records"
  on public.visited_records for insert to authenticated
  with check (auth.uid() = user_id);
drop policy if exists "Users update own visited records" on public.visited_records;
create policy "Users update own visited records"
  on public.visited_records for update to authenticated
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);
drop policy if exists "Users delete own visited records" on public.visited_records;
create policy "Users delete own visited records"
  on public.visited_records for delete to authenticated
  using (auth.uid() = user_id);

-- 2. Family notes (家庭笔记)
create table if not exists public.camp_notes (
  id bigint generated always as identity primary key,
  user_id uuid not null references auth.users(id) on delete cascade,
  campground_id integer not null,
  text text not null,
  date text not null,
  created_at timestamptz not null default now()
);
alter table public.camp_notes enable row level security;
-- Reads: own rows + the two allowlisted family emails see each other's notes.
drop policy if exists "Users manage own camp notes" on public.camp_notes;
drop policy if exists "Authenticated can read all camp notes" on public.camp_notes;
drop policy if exists "Allowlisted emails read all camp notes" on public.camp_notes;
create policy "Allowlisted emails read all camp notes"
  on public.camp_notes for select to authenticated
  using (auth.uid() = user_id
         or auth.jwt() ->> 'email' in ('darancai@gmail.com', 'nckuang123@gmail.com'));
-- Writes: strictly your own rows.
drop policy if exists "Users insert own camp notes" on public.camp_notes;
create policy "Users insert own camp notes"
  on public.camp_notes for insert to authenticated
  with check (auth.uid() = user_id);
drop policy if exists "Users update own camp notes" on public.camp_notes;
create policy "Users update own camp notes"
  on public.camp_notes for update to authenticated
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);
drop policy if exists "Users delete own camp notes" on public.camp_notes;
create policy "Users delete own camp notes"
  on public.camp_notes for delete to authenticated
  using (auth.uid() = user_id);

-- 3. Favorites (收藏): strictly owner-only
create table if not exists public.favorites (
  user_id uuid not null references auth.users(id) on delete cascade,
  campground_id integer not null,
  created_at timestamptz not null default now(),
  primary key (user_id, campground_id)
);
alter table public.favorites enable row level security;
drop policy if exists "Users manage own favorites" on public.favorites;
create policy "Users manage own favorites"
  on public.favorites for all to authenticated
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

-- 4. Shared notes (笔记分享链接, snapshot): strictly owner-only writes,
--    anonymous reads go through get_shared_note(token) only.
create table if not exists public.shared_notes (
  token text primary key,
  user_id uuid not null references auth.users(id) on delete cascade,
  campground_id integer not null,
  campground_name text not null default '',
  note_key text not null default '',
  note_text text not null,
  note_date text not null,
  created_at timestamptz not null default now()
);
alter table public.shared_notes enable row level security;
drop policy if exists "Anyone can read shared notes by token" on public.shared_notes;
drop policy if exists "Users manage own shared notes" on public.shared_notes;
create policy "Users manage own shared notes"
  on public.shared_notes for all to authenticated
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

-- 5. Anonymous share-link reader (SECURITY DEFINER, token-gated).
--    Revoke direct anon access; the client calls this RPC instead.
create or replace function public.get_shared_note(p_token text)
returns table (
  campground_name text,
  note_text text,
  note_date text,
  created_at timestamptz
)
language sql
security definer
set search_path to 'public'
as $$
  select s.campground_name, s.note_text, s.note_date, s.created_at
  from public.shared_notes s
  where s.token = p_token
  limit 1
$$;
revoke all on function public.get_shared_note(text) from public;
grant execute on function public.get_shared_note(text) to anon, authenticated;
