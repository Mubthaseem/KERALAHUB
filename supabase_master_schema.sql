-- KERALAHUB.ONLINE MASTER SUPABASE POSTGRESQL SCHEMA (100% SAFE RE-RUNNABLE)

-- Enable PostGIS & UUID Extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "postgis";

-- 1. USER ROLES & TRUST SCORE PROFILES
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT UNIQUE NOT NULL,
  full_name TEXT NOT NULL,
  avatar_url TEXT,
  district TEXT DEFAULT 'Wayanad',
  panchayat TEXT,
  ward TEXT,
  role TEXT DEFAULT 'Citizen',
  trust_score INTEGER DEFAULT 100,
  badges TEXT[] DEFAULT ARRAY['Citizen Volunteer'],
  is_verified BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. HYPER-LOCAL COMMUNITIES TABLE
CREATE TABLE IF NOT EXISTS public.communities (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  district TEXT NOT NULL,
  taluk TEXT,
  panchayat TEXT,
  ward TEXT,
  name TEXT NOT NULL,
  description TEXT,
  member_count INTEGER DEFAULT 1,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. X (TWITTER) STYLE HOME FEED POSTS
CREATE TABLE IF NOT EXISTS public.posts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  author_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  author_name TEXT NOT NULL,
  author_avatar TEXT,
  district TEXT NOT NULL,
  panchayat TEXT,
  category TEXT DEFAULT 'Community',
  content TEXT NOT NULL,
  media_urls TEXT[] DEFAULT ARRAY[]::TEXT[],
  hashtags TEXT[] DEFAULT ARRAY[]::TEXT[],
  likes_count INTEGER DEFAULT 0,
  reposts_count INTEGER DEFAULT 0,
  comments_count INTEGER DEFAULT 0,
  is_emergency_pinned BOOLEAN DEFAULT FALSE,
  is_verified_announcement BOOLEAN DEFAULT FALSE,
  is_sensitive BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. POST COMMENTS & THREADS
CREATE TABLE IF NOT EXISTS public.comments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  post_id UUID REFERENCES public.posts(id) ON DELETE CASCADE,
  author_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  author_name TEXT NOT NULL,
  content TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. EMERGENCY SOS REQUESTS
CREATE TABLE IF NOT EXISTS public.sos_requests (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  name TEXT NOT NULL,
  phone TEXT NOT NULL,
  district TEXT NOT NULL,
  location_name TEXT NOT NULL,
  lat DOUBLE PRECISION NOT NULL,
  lng DOUBLE PRECISION NOT NULL,
  category TEXT NOT NULL,
  urgency TEXT NOT NULL,
  details TEXT NOT NULL,
  status TEXT DEFAULT 'PENDING',
  people_count INTEGER DEFAULT 1,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 6. RELIEF CAMPS & LOGISTICS
CREATE TABLE IF NOT EXISTS public.relief_camps (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  district TEXT NOT NULL,
  location_name TEXT NOT NULL,
  lat DOUBLE PRECISION NOT NULL,
  lng DOUBLE PRECISION NOT NULL,
  contact_person TEXT NOT NULL,
  phone TEXT NOT NULL,
  current_occupancy INTEGER DEFAULT 0,
  max_capacity INTEGER NOT NULL,
  needed_supplies TEXT[] DEFAULT ARRAY[]::TEXT[],
  status TEXT DEFAULT 'OPEN',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 7. MARKETPLACE (FREE ITEMS, RENTALS, USED PRODUCTS)
CREATE TABLE IF NOT EXISTS public.marketplace (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  seller_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  seller_name TEXT NOT NULL,
  seller_phone TEXT NOT NULL,
  district TEXT NOT NULL,
  title TEXT NOT NULL,
  category TEXT NOT NULL,
  price TEXT NOT NULL,
  description TEXT NOT NULL,
  image_urls TEXT[] DEFAULT ARRAY[]::TEXT[],
  is_available BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 8. KERALA JOBS PORTAL
CREATE TABLE IF NOT EXISTS public.jobs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  company_name TEXT NOT NULL,
  title TEXT NOT NULL,
  district TEXT NOT NULL,
  job_type TEXT NOT NULL,
  salary TEXT NOT NULL,
  description TEXT NOT NULL,
  contact_email TEXT NOT NULL,
  contact_phone TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 9. EVENTS & TOURISM
CREATE TABLE IF NOT EXISTS public.events (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  district TEXT NOT NULL,
  category TEXT NOT NULL,
  event_date TIMESTAMPTZ NOT NULL,
  location_name TEXT NOT NULL,
  description TEXT NOT NULL,
  image_url TEXT,
  organizer_name TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ENABLE ROW LEVEL SECURITY (RLS)
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.sos_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.relief_camps ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.marketplace ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.jobs ENABLE ROW LEVEL SECURITY;

-- SAFE DROP EXISTING POLICIES TO PREVENT ERROR 42710
DROP POLICY IF EXISTS "Public Read Profiles" ON public.profiles;
DROP POLICY IF EXISTS "Public Read Posts" ON public.posts;
DROP POLICY IF EXISTS "Public Read SOS" ON public.sos_requests;
DROP POLICY IF EXISTS "Public Read Camps" ON public.relief_camps;
DROP POLICY IF EXISTS "Public Read Marketplace" ON public.marketplace;
DROP POLICY IF EXISTS "Public Read Jobs" ON public.jobs;
DROP POLICY IF EXISTS "User Create Post" ON public.posts;
DROP POLICY IF EXISTS "User Create SOS" ON public.sos_requests;

-- RE-CREATE RLS POLICIES CLEANLY
CREATE POLICY "Public Read Profiles" ON public.profiles FOR SELECT USING (true);
CREATE POLICY "Public Read Posts" ON public.posts FOR SELECT USING (true);
CREATE POLICY "Public Read SOS" ON public.sos_requests FOR SELECT USING (true);
CREATE POLICY "Public Read Camps" ON public.relief_camps FOR SELECT USING (true);
CREATE POLICY "Public Read Marketplace" ON public.marketplace FOR SELECT USING (true);
CREATE POLICY "Public Read Jobs" ON public.jobs FOR SELECT USING (true);

CREATE POLICY "User Create Post" ON public.posts FOR INSERT WITH CHECK (true);
CREATE POLICY "User Create SOS" ON public.sos_requests FOR INSERT WITH CHECK (true);
