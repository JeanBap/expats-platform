# Expats Platform

A community platform for expatriates to discover cities, connect with locals, and share experiences. Built with Next.js 14, Supabase, and Vercel.

## Quick Start

### Prerequisites
- Node.js 18+ and npm
- Supabase account
- Google OAuth credentials

### Installation

1. Clone repository and install dependencies:
```bash
cd ~/Desktop/3.\ Tools/expats-platform
npm install
```

2. Configure environment variables:
```bash
cp .env.local.example .env.local
# Edit .env.local with your Supabase and Google OAuth credentials
```

3. Run development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
expats-platform/
├── app/                    # Next.js app directory
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Home page
│   ├── cities/            # City browsing pages
│   ├── profile/           # User profile pages
│   ├── auth/              # Auth callback routes
│   └── api/               # API routes
├── components/            # React components
├── lib/                   # Utilities and hooks
├── public/                # Static assets
├── styles/                # CSS/Tailwind styles
└── package.json           # Dependencies
```

## Development

Build commands:
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run type-check` - Check TypeScript types

## Features (Phase 1)

- [x] Project scaffolding
- [ ] Supabase setup & migrations
- [ ] Google OAuth authentication
- [ ] City browser with filtering
- [ ] User profiles and ratings
- [ ] Italy MVP launch

## Roadmap

**Phase 2:** Community features (meetups, messaging)  
**Phase 3:** European expansion  
**Phase 4:** DBI & Avokatfinder integrations  

## Deployment

Deployed to Vercel. Connect GitHub repo to Vercel dashboard for automatic deployments.

## Database

PostgreSQL via Supabase. Schema defined in migrations:
- cities
- city_metrics
- user_profiles
- city_ratings
- meetups (Phase 2)
- meetup_rsvps (Phase 2)

## License

Private - Yanni Projects
