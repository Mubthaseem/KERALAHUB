-- ===================================================
-- KERALAHUB.ONLINE - SUPABASE DATABASE SCHEMA SETUP
-- Copy & Run this SQL script in your Supabase SQL Editor:
-- https://supabase.com/dashboard/project/yrmticamwadjqmulwxfm/sql/new
-- ===================================================

-- 1. SOS Requests Table
create table if not exists sos_requests (
  id text primary key,
  created_at timestamp with time zone default now(),
  name text not null,
  phone text not null,
  district text not null,
  location_name text not null,
  lat double precision not null,
  lng double precision not null,
  category text not null,
  urgency text not null,
  details text,
  status text default 'PENDING',
  people_count integer default 1
);

-- 2. Disaster Photo Reports Table
create table if not exists disaster_reports (
  id text primary key,
  created_at timestamp with time zone default now(),
  district text not null,
  location_name text not null,
  lat double precision not null,
  lng double precision not null,
  water_level text,
  description text,
  image_url text,
  reporter_contact text,
  upvotes integer default 1
);

-- 3. Relief Camps Table
create table if not exists relief_camps (
  id text primary key,
  name text not null,
  district text not null,
  location_name text not null,
  lat double precision not null,
  lng double precision not null,
  contact_person text,
  phone text,
  current_occupancy integer default 0,
  max_capacity integer default 100,
  needed_supplies text[],
  status text default 'OPEN'
);

-- 4. Community Forum Posts Table
create table if not exists forum_posts (
  id text primary key,
  created_at timestamp with time zone default now(),
  district text not null,
  category text not null,
  author_name text not null,
  title text not null,
  content text not null,
  image_url text,
  upvotes integer default 1,
  is_verified boolean default false,
  comments jsonb default '[]'::jsonb
);

-- Enable Row Level Security (RLS) & Public Read/Write Policies
alter table sos_requests enable row level security;
alter table disaster_reports enable row level security;
alter table relief_camps enable row level security;
alter table forum_posts enable row level security;

create policy "Public Read SOS" on sos_requests for select using (true);
create policy "Public Insert SOS" on sos_requests for insert with check (true);

create policy "Public Read Reports" on disaster_reports for select using (true);
create policy "Public Insert Reports" on disaster_reports for insert with check (true);

create policy "Public Read Camps" on relief_camps for select using (true);
create policy "Public Insert Camps" on relief_camps for insert with check (true);

create policy "Public Read Forums" on forum_posts for select using (true);
create policy "Public Insert Forums" on forum_posts for insert with check (true);
