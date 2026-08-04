-- KERALAHUB.ONLINE SUPABASE DATABASE SCHEMA (SAFE RE-RUNNABLE)

CREATE TABLE IF NOT EXISTS public.sos_requests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMPTZ DEFAULT NOW(),
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
  people_count INTEGER DEFAULT 1
);

CREATE TABLE IF NOT EXISTS public.disaster_reports (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  district TEXT NOT NULL,
  location_name TEXT NOT NULL,
  lat DOUBLE PRECISION NOT NULL,
  lng DOUBLE PRECISION NOT NULL,
  water_level TEXT NOT NULL,
  description TEXT NOT NULL,
  image_url TEXT,
  reporter_contact TEXT,
  upvotes INTEGER DEFAULT 0
);

CREATE TABLE IF NOT EXISTS public.relief_camps (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
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
  status TEXT DEFAULT 'OPEN'
);

ALTER TABLE public.sos_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.disaster_reports ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.relief_camps ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Public Read SOS" ON public.sos_requests;
DROP POLICY IF EXISTS "Public Read Reports" ON public.disaster_reports;
DROP POLICY IF EXISTS "Public Read Camps" ON public.relief_camps;
DROP POLICY IF EXISTS "Public Insert SOS" ON public.sos_requests;
DROP POLICY IF EXISTS "Public Insert Reports" ON public.disaster_reports;

CREATE POLICY "Public Read SOS" ON public.sos_requests FOR SELECT USING (true);
CREATE POLICY "Public Read Reports" ON public.disaster_reports FOR SELECT USING (true);
CREATE POLICY "Public Read Camps" ON public.relief_camps FOR SELECT USING (true);

CREATE POLICY "Public Insert SOS" ON public.sos_requests FOR INSERT WITH CHECK (true);
CREATE POLICY "Public Insert Reports" ON public.disaster_reports FOR INSERT WITH CHECK (true);
