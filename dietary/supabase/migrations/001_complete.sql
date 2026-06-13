-- ============================================================================
-- DietaryID Supabase Schema — Complete (run once)
-- ============================================================================

-- 1. PROFILES
CREATE TABLE IF NOT EXISTS profiles (id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE, display_name TEXT, email TEXT, location_city TEXT, bio TEXT, dietary_restrictions TEXT[] DEFAULT '{}', is_creator BOOLEAN DEFAULT false, creator_specialties TEXT[] DEFAULT '{}', preferred_cities TEXT[] DEFAULT '{}', linkedin_url TEXT, instagram_url TEXT, is_complete BOOLEAN DEFAULT false, created_at TIMESTAMPTZ DEFAULT now());
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
CREATE POLICY profiles_select ON profiles FOR SELECT USING (true);
CREATE POLICY profiles_update ON profiles FOR UPDATE USING (auth.uid() = id);
CREATE POLICY profiles_insert ON profiles FOR INSERT WITH CHECK (auth.uid() = id);

-- Auto-create profile on signup
CREATE OR REPLACE FUNCTION handle_new_user() RETURNS TRIGGER AS $$ BEGIN INSERT INTO public.profiles (id, email, display_name) VALUES (NEW.id, NEW.email, COALESCE(NEW.raw_user_meta_data->>'name', split_part(NEW.email, '@', 1))); RETURN NEW; END; $$ LANGUAGE plpgsql SECURITY DEFINER;
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created AFTER INSERT ON auth.users FOR EACH ROW EXECUTE FUNCTION handle_new_user();

-- 2. RESTAURANTS
CREATE TABLE IF NOT EXISTS restaurants (id UUID PRIMARY KEY DEFAULT gen_random_uuid(), name TEXT NOT NULL, description TEXT, cuisine_type TEXT, city TEXT, postcode TEXT, avg_safety_rating DOUBLE PRECISION DEFAULT 0, total_reviews INTEGER DEFAULT 0, verified_status TEXT DEFAULT 'unverified', owner_id UUID REFERENCES auth.users(id), is_active BOOLEAN DEFAULT true, created_at TIMESTAMPTZ DEFAULT now());
ALTER TABLE restaurants ENABLE ROW LEVEL SECURITY;
CREATE POLICY restaurants_select ON restaurants FOR SELECT USING (true);
CREATE INDEX IF NOT EXISTS idx_restaurants_city ON restaurants(city);
CREATE INDEX IF NOT EXISTS idx_restaurants_rating ON restaurants(avg_safety_rating DESC);

-- 3. ALLERGEN PROFILES
CREATE TABLE IF NOT EXISTS restaurant_allergen_profiles (id UUID PRIMARY KEY DEFAULT gen_random_uuid(), restaurant_id UUID UNIQUE REFERENCES restaurants(id) ON DELETE CASCADE, can_handle_celiac BOOLEAN DEFAULT false, can_handle_gluten_free BOOLEAN DEFAULT false, can_handle_nuts BOOLEAN DEFAULT false, can_handle_dairy_free BOOLEAN DEFAULT false, can_handle_vegan BOOLEAN DEFAULT false, can_handle_vegetarian BOOLEAN DEFAULT false);
ALTER TABLE restaurant_allergen_profiles ENABLE ROW LEVEL SECURITY;
CREATE POLICY allergen_select ON restaurant_allergen_profiles FOR SELECT USING (true);

-- 4. REVIEWS
CREATE TABLE IF NOT EXISTS restaurant_reviews (id UUID PRIMARY KEY DEFAULT gen_random_uuid(), restaurant_id UUID NOT NULL REFERENCES restaurants(id) ON DELETE CASCADE, user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE, title TEXT, content TEXT NOT NULL, safety_rating INTEGER NOT NULL CHECK (safety_rating BETWEEN 1 AND 5), overall_rating INTEGER NOT NULL CHECK (overall_rating BETWEEN 1 AND 5), allergens_mentioned TEXT[] DEFAULT '{}', helpful_count INTEGER DEFAULT 0, review_status TEXT DEFAULT 'pending', created_at TIMESTAMPTZ DEFAULT now(), UNIQUE(user_id, restaurant_id));
ALTER TABLE restaurant_reviews ENABLE ROW LEVEL SECURITY;
CREATE POLICY reviews_select ON restaurant_reviews FOR SELECT USING (true);
CREATE POLICY reviews_insert ON restaurant_reviews FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY reviews_update ON restaurant_reviews FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY reviews_delete ON restaurant_reviews FOR DELETE USING (auth.uid() = user_id);
CREATE INDEX IF NOT EXISTS idx_reviews_rest ON restaurant_reviews(restaurant_id);

-- 5. COMMUNITY POSTS
CREATE TABLE IF NOT EXISTS community_posts (id UUID PRIMARY KEY DEFAULT gen_random_uuid(), user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE, title TEXT NOT NULL, content TEXT NOT NULL, post_type TEXT DEFAULT 'general', restriction_type TEXT, category TEXT, likes_count INTEGER DEFAULT 0, replies_count INTEGER DEFAULT 0, created_at TIMESTAMPTZ DEFAULT now());
ALTER TABLE community_posts ENABLE ROW LEVEL SECURITY;
CREATE POLICY posts_select ON community_posts FOR SELECT USING (true);
CREATE POLICY posts_insert ON community_posts FOR INSERT WITH CHECK (auth.uid() = user_id);

-- 6. COMMUNITY REPLIES
CREATE TABLE IF NOT EXISTS community_replies (id UUID PRIMARY KEY DEFAULT gen_random_uuid(), post_id UUID NOT NULL REFERENCES community_posts(id) ON DELETE CASCADE, user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE, content TEXT NOT NULL, likes_count INTEGER DEFAULT 0, created_at TIMESTAMPTZ DEFAULT now());
ALTER TABLE community_replies ENABLE ROW LEVEL SECURITY;
CREATE POLICY replies_select ON community_replies FOR SELECT USING (true);

-- 7. DIRECT MESSAGES
CREATE TABLE IF NOT EXISTS direct_messages (id UUID PRIMARY KEY DEFAULT gen_random_uuid(), from_user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE, to_user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE, content TEXT NOT NULL, is_read BOOLEAN DEFAULT false, created_at TIMESTAMPTZ DEFAULT now());
ALTER TABLE direct_messages ENABLE ROW LEVEL SECURITY;
CREATE POLICY msg_select ON direct_messages FOR SELECT USING (auth.uid() = from_user_id OR auth.uid() = to_user_id);
CREATE POLICY msg_insert ON direct_messages FOR INSERT WITH CHECK (auth.uid() = from_user_id);

-- 8. CREATOR COMMISSIONS
CREATE TABLE IF NOT EXISTS creator_commissions (id UUID PRIMARY KEY DEFAULT gen_random_uuid(), creator_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE, restaurant_id UUID REFERENCES restaurants(id), commission_type TEXT NOT NULL DEFAULT 'review', amount DECIMAL(8,2) NOT NULL, status TEXT DEFAULT 'pending', created_at TIMESTAMPTZ DEFAULT now());
ALTER TABLE creator_commissions ENABLE ROW LEVEL SECURITY;
CREATE POLICY comm_select ON creator_commissions FOR SELECT USING (auth.uid() = creator_id);
CREATE INDEX IF NOT EXISTS idx_comm_creator ON creator_commissions(creator_id);

-- 9. BLOG POSTS
CREATE TABLE IF NOT EXISTS blog_posts (id UUID PRIMARY KEY DEFAULT gen_random_uuid(), title TEXT NOT NULL, excerpt TEXT, content TEXT, author TEXT, role TEXT, category TEXT, img TEXT, slug TEXT, date TEXT, published BOOLEAN DEFAULT true, created_at TIMESTAMPTZ DEFAULT now());
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;
CREATE POLICY blog_select ON blog_posts FOR SELECT USING (published = true);

-- 10. TRAINING
CREATE TABLE IF NOT EXISTS training_modules (id UUID PRIMARY KEY DEFAULT gen_random_uuid(), title TEXT NOT NULL, duration INTEGER DEFAULT 15, description TEXT, content TEXT, quiz_questions JSONB, "order" INTEGER DEFAULT 1, created_at TIMESTAMPTZ DEFAULT now());
ALTER TABLE training_modules ENABLE ROW LEVEL SECURITY;
CREATE POLICY train_select ON training_modules FOR SELECT USING (true);

CREATE TABLE IF NOT EXISTS training_completions (id UUID PRIMARY KEY DEFAULT gen_random_uuid(), member_id TEXT NOT NULL, member_name TEXT, module_id UUID REFERENCES training_modules(id) ON DELETE CASCADE, score INTEGER, status TEXT DEFAULT 'not_started', completed_at TIMESTAMPTZ);
ALTER TABLE training_completions ENABLE ROW LEVEL SECURITY;
CREATE POLICY tcomp_select ON training_completions FOR SELECT USING (true);

-- 11. SUPPORT
CREATE TABLE IF NOT EXISTS support_tickets (id UUID PRIMARY KEY DEFAULT gen_random_uuid(), restaurant_name TEXT, restaurant_email TEXT, subject TEXT, type TEXT, priority TEXT DEFAULT 'Medium', description TEXT, status TEXT DEFAULT 'open', replies JSONB DEFAULT '[]'::jsonb, created_at TIMESTAMPTZ DEFAULT now());
ALTER TABLE support_tickets ENABLE ROW LEVEL SECURITY;
CREATE POLICY sptk_select ON support_tickets FOR SELECT USING (true);

-- ============================================================================
-- SEED DATA
-- ============================================================================
INSERT INTO restaurants (name, cuisine_type, city, avg_safety_rating, total_reviews, verified_status) VALUES
  ('The Italian Kitchen', 'Italian', 'Manchester', 4.8, 47, 'verified'),
  ('Fresh Bowl', 'Mediterranean', 'Manchester', 4.7, 28, 'verified'),
  ('Sakura Sushi', 'Japanese', 'Manchester', 4.5, 12, 'verified'),
  ('The Vegan Table', 'Vegan', 'Manchester', 4.6, 33, 'verified'),
  ('Pizza Roma', 'Italian', 'Manchester', 4.4, 19, 'verified'),
  ('Spice Route', 'Indian', 'Leeds', 4.5, 22, 'verified'),
  ('Green Garden Cafe', 'Vegan', 'Manchester', 4.3, 15, 'verified'),
  ('TURAN Turkish Cuisine', 'Turkish', 'London', 4.7, 58, 'verified'),
  ('Meram Kitchen', 'Turkish', 'Manchester', 4.5, 34, 'verified'),
  ('The Healthy Bowl Co', 'Mediterranean', 'Manchester', 4.9, 64, 'verified');

INSERT INTO restaurant_allergen_profiles (restaurant_id, can_handle_celiac, can_handle_gluten_free, can_handle_nuts, can_handle_dairy_free, can_handle_vegan, can_handle_vegetarian)
  SELECT id, true, true, random() > 0.3, true, random() > 0.5, true FROM restaurants;

INSERT INTO training_modules (title, duration, description, content, quiz_questions, "order") VALUES
  ('Allergen Basics', 15, 'Food allergies vs. intolerances, legal basics', '## Module 1: Allergen Basics...', '[{"q":"What is the difference?","options":["Immune vs digestive","Same","Neither"],"correct":0}]', 1),
  ('Menu & Ingredient Knowledge', 20, 'Reading labels, hidden allergens', '## Module 2: Ingredient Knowledge...', '[{"q":"Which is hidden gluten?","options":["Soy sauce","Olive oil","Salt"],"correct":0}]', 2),
  ('Customer Communication', 15, 'How to ask about allergies', '## Module 3: Communication...', '[{"q":"What should you do first?","options":["Ask clarifying questions","Ignore","Argue"],"correct":0}]', 3),
  ('Procedures & Safety', 20, 'Restaurant procedures for safety', '## Module 4: Safety...', '[{"q":"How to mark allergen orders?","options":["In RED","Same","Verbally"],"correct":0}]', 4),
  ('DietaryID & Your Profile', 10, 'Why DietaryID matters', '## Module 5: DietaryID...', '[{"q":"Why verified?","options":["Shows allergy commitment","No reason","Marketing only"],"correct":0}]', 5);

INSERT INTO blog_posts (title, excerpt, author, role, category, img, slug, date, published) VALUES
  ('How 3-layer verification gives you confidence', 'Behind every safety score: menu verification, database cross-checks, and peer reviews.', 'Emma Collins', 'Head of Trust & Safety', 'Product', '🛡️', '3-layer-verification', 'Jun 10, 2026', true),
  ('Creator Spotlight: Earning £200+/month', 'Sarah Mitchell earned £2,847 from DietaryID reviews.', 'Mike Henderson', 'Community Editor', 'Creators', '⭐', 'creator-spotlight', 'Jun 8, 2026', true),
  ('New: Book tables directly from DietaryID', 'Book tables at verified restaurants right from the app.', 'Jordan Lee', 'Product Manager', 'Product', '📅', 'book-tables', 'Jun 5, 2026', true),
  ('Hidden allergens in restaurant dishes', 'Soy in salad dressing. Gluten in soup thickeners.', 'Dr. Sophie Turner', 'Allergen Specialist', 'Education', '🔍', 'hidden-allergens', 'Jun 1, 2026', true),
  ('Introducing the Creator Training Portal', '5 free modules for restaurant staff.', 'James Park', 'Training Lead', 'Product', '🎓', 'training-portal', 'May 25, 2026', true);

INSERT INTO support_tickets (restaurant_name, restaurant_email, subject, type, priority, description, status) VALUES
  ('The Italian Kitchen', 'owner@italiankitchen.com', 'Menu verification taking too long', 'Technical', 'Medium', 'We submitted our menu 2 weeks ago.', 'open'),
  ('Green Garden Cafe', 'owner@greengarden.com', 'Cannot update allergen info', 'Technical', 'High', 'Page freezes when editing.', 'open');
