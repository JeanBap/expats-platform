'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/lib/auth-context';
import { supabase } from '@/lib/auth-config';
import styles from './RatingDisplay.module.css';

interface RatingStats {
  totalRatings: number;
  averageRating: number;
  userRating?: number;
}

interface RatingDisplayProps {
  cityId: number;
  onStatsLoaded: (stats: RatingStats) => void;
}

export default function RatingDisplay({ cityId, onStatsLoaded }: RatingDisplayProps) {
  const { user } = useAuth();
  const [stats, setStats] = useState<RatingStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadRatings();
  }, [cityId, user]);

  const loadRatings = async () => {
    try {
      const { data: aggregateData } = await supabase
        .from('city_ratings_aggregate')
        .select('total_ratings, average_rating')
        .eq('city_id', cityId)
        .single();

      let userRating: number | undefined;

      if (user) {
        const { data: userRatingData, error: userError } = await supabase
          .from('ratings')
          .select('rating')
          .eq('city_id', cityId)
          .eq('user_id', user.id)
          .single();

        if (!userError && userRatingData) {
          userRating = userRatingData.rating;
        }
      }

      const newStats: RatingStats = {
        totalRatings: aggregateData?.total_ratings || 0,
        averageRating: aggregateData?.average_rating || 0,
        userRating,
      };

      setStats(newStats);
      onStatsLoaded(newStats);
    } catch (err) {
      console.error('Failed to load ratings:', err);
      const defaultStats: RatingStats = { totalRatings: 0, averageRating: 0 };
      setStats(defaultStats);
      onStatsLoaded(defaultStats);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className={styles.loading}>Loading ratings...</div>;
  }

  if (!stats || stats.totalRatings === 0) {
    return (
      <div className={styles.noRatings}>
        <p>No ratings yet. Be the first to rate!</p>
      </div>
    );
  }

  const stars = Array.from({ length: 5 }, (_, i) => i + 1);
  const userRating = stats.userRating ?? 0;

  return (
    <div className={styles.container}>
      <div className={styles.summary}>
        <div className={styles.rating}>
          <span className={styles.average}>{stats.averageRating.toFixed(1)}</span>
          <div className={styles.stars}>
            {stars.map((star) => (
              <span
                key={star}
                className={`${styles.star} ${star <= Math.round(stats.averageRating) ? styles.filled : ''}`}
              >
                ★
              </span>
            ))}
          </div>
          <span className={styles.count}>({stats.totalRatings} ratings)</span>
        </div>

        {userRating > 0 && (
          <div className={styles.userRating}>
            <p>Your rating:</p>
            <div className={styles.userStars}>
              {stars.map((star) => (
                <span
                  key={star}
                  className={`${styles.star} ${star <= userRating ? styles.filled : ''}`}
                >
                  ★
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
