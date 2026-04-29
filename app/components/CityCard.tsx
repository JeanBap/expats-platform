'use client';

import { useState } from 'react';
import styles from './CityCard.module.css';

interface CityMetrics {
  cost_index: number;
  internet_speed_mbps: number;
  safety_index: number;
  visa_ease_index: number;
  climate_temp_avg: number;
  lgbtq_friendly_index: number;
  air_quality_index: number;
}

interface City {
  id: string;
  name: string;
  country: string;
  image_url?: string;
  description?: string;
  population: number;
  region: string;
  city_metrics?: CityMetrics;
}

export default function CityCard({ city, onSelect }: { city: City; onSelect: (city: City) => void }) {
  const [imageError, setImageError] = useState(false);
  const metrics = city.city_metrics;

  const getCostColor = (cost: number) => {
    if (cost < 40) return '#22c55e'; // green
    if (cost < 70) return '#eab308'; // yellow
    return '#ef4444'; // red
  };

  const getSafetyLabel = (safety: number) => {
    if (safety >= 75) return 'Very Safe';
    if (safety >= 60) return 'Safe';
    if (safety >= 45) return 'Moderate';
    return 'Caution';
  };

  return (
    <div className={styles.card} onClick={() => onSelect(city)}>
      <div className={styles.imageContainer}>
        {city.image_url && !imageError ? (
          <img
            src={city.image_url}
            alt={city.name}
            onError={() => setImageError(true)}
            className={styles.image}
          />
        ) : (
          <div className={styles.imagePlaceholder}>
            <span>🌍</span>
          </div>
        )}
        <div className={styles.overlay}>
          <button className={styles.viewButton}>View Details</button>
        </div>
      </div>

      <div className={styles.content}>
        <h3 className={styles.title}>{city.name}</h3>
        <p className={styles.country}>{city.country}</p>
        <p className={styles.region}>{city.region}</p>

        {metrics && (
          <div className={styles.metrics}>
            <div className={styles.metricItem}>
              <span className={styles.metricLabel}>Cost</span>
              <div
                className={styles.metricBar}
                style={{
                  backgroundColor: getCostColor(metrics.cost_index),
                  width: `${Math.min(metrics.cost_index, 100)}%`,
                }}
              />
              <span className={styles.metricValue}>{metrics.cost_index}</span>
            </div>

            <div className={styles.metricItem}>
              <span className={styles.metricLabel}>Safety</span>
              <div className={styles.metricBar}>
                <div
                  style={{
                    width: `${metrics.safety_index}%`,
                    height: '100%',
                    backgroundColor: '#3b82f6',
                  }}
                />
              </div>
              <span className={styles.metricValue}>{getSafetyLabel(metrics.safety_index)}</span>
            </div>

            <div className={styles.metricItem}>
              <span className={styles.metricLabel}>Internet</span>
              <span className={styles.metricValue}>{metrics.internet_speed_mbps} Mbps</span>
            </div>

            <div className={styles.metricItem}>
              <span className={styles.metricLabel}>Temp</span>
              <span className={styles.metricValue}>{metrics.climate_temp_avg}°C</span>
            </div>
          </div>
        )}

        {city.description && <p className={styles.description}>{city.description}</p>}
      </div>
    </div>
  );
}
