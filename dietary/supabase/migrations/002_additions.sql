-- Add missing tables for full Supabase integration
-- Run in Supabase SQL Editor

-- BOOKINGS
CREATE TABLE IF NOT EXISTS bookings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  user_name TEXT NOT NULL,
  user_restriction TEXT,
  restaurant_id TEXT NOT NULL,
  restaurant_name TEXT NOT NULL,
  date TEXT NOT NULL,
  time TEXT NOT NULL,
  party_size INTEGER DEFAULT 2,
  requests TEXT,
  status TEXT DEFAULT 'Waiting',
  created_at TIMESTAMPTZ DEFAULT now()
);
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;
CREATE POLICY bookings_select ON bookings FOR SELECT USING (true);
CREATE POLICY bookings_insert ON bookings FOR INSERT WITH CHECK (true);
CREATE POLICY bookings_update ON bookings FOR UPDATE USING (true);

-- Add missing columns to blog_posts
ALTER TABLE blog_posts ADD COLUMN IF NOT EXISTS role TEXT;
ALTER TABLE blog_posts ADD COLUMN IF NOT EXISTS date TEXT;

UPDATE blog_posts SET role = 'Head of Trust & Safety', date = 'Jun 10, 2026' WHERE slug = '3-layer-verification';
UPDATE blog_posts SET role = 'Community Editor', date = 'Jun 8, 2026' WHERE slug = 'creator-spotlight';
UPDATE blog_posts SET role = 'Product Manager', date = 'Jun 5, 2026' WHERE slug = 'book-tables';
UPDATE blog_posts SET role = 'Allergen Specialist', date = 'Jun 1, 2026' WHERE slug = 'hidden-allergens';
UPDATE blog_posts SET role = 'Training Lead', date = 'May 25, 2026' WHERE slug = 'training-portal';
