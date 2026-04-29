import { createClient } from '@supabase/supabase-js';
import { GoogleAuthProvider } from 'firebase/auth';

// Supabase client configuration
export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || '',
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
);

// Google OAuth configuration
export const googleAuthConfig = {
  clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || '',
  clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
  redirectUri: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
};

// OAuth scopes for Google
export const GOOGLE_OAUTH_SCOPES = [
  'openid',
  'profile',
  'email'
];
