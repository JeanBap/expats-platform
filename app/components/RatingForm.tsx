'use client';

import { useState } from 'react';
import { useAuth } from '@/lib/auth-context';
import { supabase } from '@/lib/auth-config';
import styles from './RatingForm.module.css';

interface RatingFormProps {
  cityId: number;
  cityName: string;
  onRatingSubmitted: () => void;
}

export default function RatingForm({ cityId, cityName, onRatingSubmitted }: RatingFormProps) {
  const { user } = useAuth();
  const [rating, setRating] = useState<number>(0);
  const [review, setReview] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || rating === 0) return;

    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const { error: submitError } = await supabase
        .from('ratings')
        .upsert(
          {
            city_id: cityId,
            user_id: user.id,
            rating,
            review: review.trim() || null,
          },
          { onConflict: 'city_id,user_id' }
        );

      if (submitError) throw submitError;

      setSuccess(true);
      setRating(0);
      setReview('');
      onRatingSubmitted();
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to submit rating');
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return (
      <div className={styles.loginPrompt}>
        <p>Sign in to rate {cityName}</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <h3>Rate This City</h3>
      
      <div className={styles.starContainer}>
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            className={`${styles.star} ${rating >= star ? styles.filled : ''}`}
            onClick={() => setRating(star)}
            disabled={loading}
          >
            ★
          </button>
        ))}
      </div>

      <textarea
        value={review}
        onChange={(e) => setReview(e.target.value)}
        placeholder="Share your experience (optional)"
        maxLength={500}
        disabled={loading}
        className={styles.textarea}
      />

      <div className={styles.charCount}>
        {review.length}/500
      </div>

      <button
        type="submit"
        disabled={loading || rating === 0}
        className={styles.submitBtn}
      >
        {loading ? 'Submitting...' : 'Submit Rating'}
      </button>

      {error && <div className={styles.error}>{error}</div>}
      {success && <div className={styles.success}>Rating submitted!</div>}
    </form>
  );
}
