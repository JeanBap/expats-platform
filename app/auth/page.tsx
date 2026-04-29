'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth-context';
import styles from './auth.module.css';

export default function AuthPage() {
  const { user, loading, signInWithGoogle } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // Redirect to home if already authenticated
    if (user && !loading) {
      router.push('/');
    }
  }, [user, loading, router]);

  const handleGoogleSignIn = async () => {
    try {
      await signInWithGoogle();
    } catch (error) {
      console.error('Sign in failed:', error);
    }
  };

  if (loading) {
    return <div className={styles.loading}>Loading...</div>;
  }

  return (
    <div className={styles.authContainer}>
      <div className={styles.authBox}>
        <h1>Welcome to Expats</h1>
        <p className={styles.subtitle}>
          Discover and rate cities for expats and digital nomads
        </p>

        <button
          onClick={handleGoogleSignIn}
          className={styles.googleButton}
          disabled={loading}
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <circle cx="12" cy="12" r="10" />
          </svg>
          Sign in with Google
        </button>

        <p className={styles.disclaimer}>
          We only use your email to create your account. Your data is safe and secure.
        </p>
      </div>
    </div>
  );
}
