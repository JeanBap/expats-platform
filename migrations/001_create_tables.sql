-- Migration: Create base tables for Expats Platform
-- Tables: cities, city_metrics, user_profiles, city_ratings

-- 1. Cities table
CREATE TABLE IF NOT EXISTS cities (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  country VARCHAR(255) NOT NULL,
  slug VARCHAR(255) UNIQUE NOT NULL,
  lat DECIMAL(10, 8),
  lng DECIMAL(11, 8),
  population INTEGER,
  region VARCHAR(255),
  image_url TEXT,
  description TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_cities_country ON cities(country);
CREATE INDEX IF NOT EXISTS idx_cities_slug ON cities(slug);

-- 2. City Metrics table
CREATE TABLE IF NOT EXISTS city_metrics (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  city_id UUID NOT NULL REFERENCES cities(id) ON DELETE CASCADE,
  cost_index DECIMAL(5, 2),
  internet_speed_mbps DECIMAL(6, 2),
  safety_index DECIMAL(3, 1),
  visa_ease_index DECIMAL(3, 1),
  climate_temp_avg DECIMAL(4, 1),
  lgbtq_friendly_index DECIMAL(3, 1),
  air_quality_index DECIMAL(3, 1),
  source VARCHAR(255),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(city_id, source)
);

CREATE INDEX IF NOT EXISTS idx_city_metrics_city_id ON city_metrics(city_id);

-- 3. User Profiles table
CREATE TABLE IF NOT EXISTS user_profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email VARCHAR(255) UNIQUE NOT NULL,
  name VARCHAR(255),
  photo_url TEXT,
  bio TEXT,
  visited_cities JSONB DEFAULT '[]'::jsonb,
  interests JSONB DEFAULT '[]'::jsonb,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. City Ratings table
CREATE TABLE IF NOT EXISTS city_ratings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  city_id UUID NOT NULL REFERENCES cities(id) ON DELETE CASCADE,
  rating INTEGER CHECK (rating >= 1 AND rating <= 5),
  comment TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, city_id)
);

CREATE INDEX IF NOT EXISTS idx_city_ratings_city_id ON city_ratings(city_id);
CREATE INDEX IF NOT EXISTS idx_city_ratings_user_id ON city_ratings(user_id);
