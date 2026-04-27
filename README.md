# Expats Community Platform

A community platform for expats in Italy to discover cities, share ratings, and connect with other expats.

## Features (Phase 1)
- 20 Italian cities with detailed information and metrics
- City ratings system (1-5 stars) with optional reviews
- Aggregate ratings display
- User authentication
- City metrics including cost of living, safety, internet speed, visa ease, and more

## Tech Stack
- Next.js 14 with TypeScript
- React with CSS Modules
- Supabase PostgreSQL database
- Row Level Security (RLS) policies

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

## Database Migrations

Migrations are managed via Supabase. See the migrations folder for schema definitions.

## Components

- `RatingForm.tsx` - Form for submitting city ratings
- `RatingDisplay.tsx` - Display aggregate ratings for a city
- `CityDetailModal.tsx` - Modal showing detailed city information with ratings

