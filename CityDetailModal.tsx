'use client';

import { useState } from 'react';
import RatingDisplay from './RatingDisplay';
import RatingForm from './RatingForm';
import styles from './CityDetailModal.module.css';

interface CityWithMetrics {
  id: number;
  name: string;
  country: string;
  description: string;
  image_url: string;
  population: number;
  city_metrics: {
    cost_index: number;
    internet_speed_mbps: number;
    safety_index: number;
    visa_ease_index: number;
    climate_temp_avg: number;
    lgbtq_friendly_index: number;
    air_quality_index: number;
  };
}

interface CityDetailModalProps {
  city: CityWithMetrics | null;
  onClose: () => void;
}

function getMetricColor(value: number): string {
  if (value >= 75) return '#10b981';
  if (value >= 50) return '#f59e0b';
  return '#ef4444';
}

export default function CityDetailModal({ city, onClose }: CityDetailModalProps) {
  const [refreshKey, setRefreshKey] = useState(0);

  if (!city) return null;

  const metrics = city.city_metrics;

  const metricsList = [
    { name: 'Cost of Living', value: metrics.cost_index, unit: '', max: 100 },
    { name: 'Safety', value: metrics.safety_index, unit: '', max: 100 },
    { name: 'Internet Speed', value: metrics.internet_speed_mbps, unit: 'Mbps', max: 150 },
    { name: 'Visa Ease', value: metrics.visa_ease_index, unit: '', max: 100 },
    { name: 'Avg Temperature', value: metrics.climate_temp_avg, unit: '°C', max: 30, center: true },
    { name: 'LGBTQ+ Friendly', value: metrics.lgbtq_friendly_index, unit: '', max: 100 },
    { name: 'Air Quality', value: metrics.air_quality_index, unit: '', max: 100 },
  ];

  const handleEscape = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') onClose();
  };

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) onClose();
  };

  const handleRatingSubmitted = () => {
    setRefreshKey((prev) => prev + 1);
  };

  return (
    <div
      className={styles.overlay}
      onClick={handleOverlayClick}
      onKeyDown={handleEscape}
      role="dialog"
      aria-modal="true"
    >
      <div className={styles.modal}>
        <button className={styles.closeBtn} onClick={onClose} aria-label="Close">
          ✕
        </button>

        <div className={styles.header}>
          <img
            src={city.image_url || ''}
            alt={city.name}
            className={styles.image}
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.style.background = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
            }}
          />
          <div className={styles.titleSection}>
            <h2>{city.name}</h2>
            <p className={styles.subtitle}>{city.country}</p>
            <p className={styles.description}>{city.description}</p>
            <p className={styles.population}>
              Population: {city.population.toLocaleString()}
            </p>
          </div>
        </div>

        <div className={styles.ratings}>
          <RatingDisplay
            key={refreshKey}
            cityId={city.id}
            onStatsLoaded={() => {}}
          />
        </div>

        <div className={styles.metricsGrid}>
          {metricsList.map((metric) => {
            const percentage = (metric.value / metric.max) * 100;
            const clampedPercentage = Math.min(100, percentage);
            const color = getMetricColor(metric.value);

            return (
              <div key={metric.name} className={styles.metricCard}>
                <div className={styles.metricHeader}>
                  <span className={styles.metricName}>{metric.name}</span>
                  <span className={styles.metricValue}>
                    {metric.value}
                    {metric.unit}
                  </span>
                </div>
                <div className={styles.metricBar}>
                  <div
                    className={styles.metricFill}
                    style={{
                      width: `${clampedPercentage}%`,
                      backgroundColor: color,
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>

        <div className={styles.ratingForm}>
          <RatingForm
            key={refreshKey}
            cityId={city.id}
            cityName={city.name}
            onRatingSubmitted={handleRatingSubmitted}
          />
        </div>
      </div>
    </div>
  );
}
