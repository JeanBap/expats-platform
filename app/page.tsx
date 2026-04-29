'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Navigation from './components/Navigation';
import CityBrowser from './components/CityBrowser';
import { useAuth } from '@/lib/auth-context';

export default function Home() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // Redirect to auth if not logged in
    if (!loading && !user) {
      router.push('/auth');
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <>
        <Navigation />
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh', fontSize: '18px', color: '#6b7280' }}>
          Loading...
        </div>
      </>
    );
  }

  if (!user) {
    return null; // Will redirect
  }

  return (
    <>
      <Navigation />
      <CityBrowser />
    </>
  );
}
