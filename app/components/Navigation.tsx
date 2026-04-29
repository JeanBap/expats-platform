'use client';

import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth-context';
import styles from './Navigation.module.css';

export default function Navigation() {
  const { user, loading, signOut } = useAuth();
  const router = useRouter();

  const handleSignOut = async () => {
    try {
      await signOut();
      router.push('/auth');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const handleLogoClick = () => {
    router.push('/');
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.container}>
        <button
          className={styles.logo}
          onClick={handleLogoClick}
          aria-label="Expats Home"
        >
          <span className={styles.logoText}>Expats</span>
        </button>

        <div className={styles.navLinks}>
          {user && !loading ? (
            <>
              <div className={styles.userSection}>
                <span className={styles.userEmail}>{user.email}</span>
                <button
                  onClick={handleSignOut}
                  className={`${styles.navButton} ${styles.signOut}`}
                >
                  Sign Out
                </button>
              </div>
            </>
          ) : !loading ? (
            <button
              onClick={() => router.push('/auth')}
              className={styles.navButton}
            >
              Sign In
            </button>
          ) : null}
        </div>
      </div>
    </nav>
  );
}
