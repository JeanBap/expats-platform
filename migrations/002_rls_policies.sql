-- Migration: Enable RLS and set security policies

-- Enable Row Level Security
ALTER TABLE cities ENABLE ROW LEVEL SECURITY;
ALTER TABLE city_metrics ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE city_ratings ENABLE ROW LEVEL SECURITY;

-- Cities: Public read access
CREATE POLICY "cities_read_public" ON cities
  FOR SELECT USING (true);

-- City Metrics: Public read access
CREATE POLICY "city_metrics_read_public" ON city_metrics
  FOR SELECT USING (true);

-- User Profiles: Public read own, authenticated write own
CREATE POLICY "profiles_read_public" ON user_profiles
  FOR SELECT USING (true);

CREATE POLICY "profiles_write_own" ON user_profiles
  FOR INSERT WITH CHECK (auth.uid() = id);

CREATE POLICY "profiles_update_own" ON user_profiles
  FOR UPDATE USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

-- City Ratings: Read all, write authenticated only
CREATE POLICY "ratings_read_all" ON city_ratings
  FOR SELECT USING (true);

CREATE POLICY "ratings_insert_auth" ON city_ratings
  FOR INSERT WITH CHECK (auth.uid() = user_id AND auth.role() = 'authenticated');

CREATE POLICY "ratings_update_own" ON city_ratings
  FOR UPDATE USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "ratings_delete_own" ON city_ratings
  FOR DELETE USING (auth.uid() = user_id);
