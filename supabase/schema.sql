-- Supabase schema for camping-guide cloud sync
-- Run this once in the Supabase SQL Editor (or via psql).
-- Tables: visited_records, camp_notes, favorites, shared_notes
-- All tables use Row Level Security: users can only touch their own rows,
-- except shared_notes which anyone can read by token (unguessable UUID).

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
drop policy if exists "Users manage own visited records" on public.visited_records;
create policy "Users manage own visited records"
  on public.visited_records for all
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

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
drop policy if exists "Users manage own camp notes" on public.camp_notes;
create policy "Users manage own camp notes"
  on public.camp_notes for all
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

-- 3. Favorites (收藏)
create table if not exists public.favorites (
  user_id uuid not null references auth.users(id) on delete cascade,
  campground_id integer not null,
  created_at timestamptz not null default now(),
  primary key (user_id, campground_id)
);
alter table public.favorites enable row level security;
drop policy if exists "Users manage own favorites" on public.favorites;
create policy "Users manage own favorites"
  on public.favorites for all
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

-- 4. Shared notes (笔记分享链接, snapshot)
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
-- Anyone with the (unguessable) token can read the shared snapshot.
drop policy if exists "Anyone can read shared notes by token" on public.shared_notes;
create policy "Anyone can read shared notes by token"
  on public.shared_notes for select
  using (true);
-- Owners can create / delete their own share links.
drop policy if exists "Users manage own shared notes" on public.shared_notes;
create policy "Users manage own shared notes"
  on public.shared_notes for all
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);
