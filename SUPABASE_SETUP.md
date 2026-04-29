# Supabase Setup Guide - Expats Platform

Using GCM's existing Supabase project: `myizauhtpcnkwguralwc`

## Step 1: Run Database Migrations

1. Go to: <https://supabase.com/dashboard/project/myizauhtpcnkwguralwc/sql>
2. Click **"New Query"**
3. Copy contents of `migrations/001_create_tables.sql`
4. Paste into SQL editor
5. Click **"Run"**
6. Verify: All 4 tables created (cities, city_metrics, user_profiles, city_ratings)

Repeat for `migrations/002_rls_policies.sql`

## Step 2: Verify Tables in SQL Editor

```sql
SELECT table_name FROM information_schema.tables WHERE table_schema = 'public';
```

Expected output:

- cities
- city_metrics
- user_profiles
- city_ratings

## Step 3: Test RLS Policies

```sql
-- Check RLS is enabled
SELECT tablename FROM pg_tables WHERE schemaname = 'public';
```

## Step 4: Create Supabase Client in Next.js

File: `lib/supabase.ts`

```typescript
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export type Database = {
  public: {
    Tables: {
      cities: { Row: { id: string; name: string; country: string; slug: string; lat?: number; lng?: number; population?: number; region?: string; image_url?: string; description?: string; created_at: string; updated_at: string } }
      city_metrics: { Row: { id: string; city_id: string; cost_index?: number; internet_speed_mbps?: number; safety_index?: number; visa_ease_index?: number; climate_temp_avg?: number; lgbtq_friendly_index?: number; air_quality_index?: number; source?: string; updated_at: string } }
      user_profiles: { Row: { id: string; email: string; name?: string; photo_url?: string; bio?: string; visited_cities: any; interests: any; created_at: string; updated_at: string } }
      city_ratings: { Row: { id: string; user_id: string; city_id: string; rating: number; comment?: string; created_at: string; updated_at: string } }
    }
  }
}
```

## Step 5: Add Environment Variables

Update `.env.local`:

```
NEXT_PUBLIC_SUPABASE_URL=https://myizauhtpcnkwguralwc.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=[YOUR_ANON_KEY_HERE]
```

Get the anon key from: <https://supabase.com/dashboard/project/myizauhtpcnkwguralwc/settings/api>

## Next Steps

- **Phase 1, Step 3:** Create database migration scripts (done above)
- **Phase 1, Step 4:** Build Next.js boilerplate + Google Auth
- **Phase 1, Step 5:** Build City Browser UI
- **Phase 1, Step 6:** Seed Italy data
- **Phase 1, Step 7:** Implement ratings
- **Phase 1, Step 8:** Deploy to Vercel
