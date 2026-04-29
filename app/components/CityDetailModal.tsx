'use client';

import { useEffect } from 'react';
import styles from './CityDetailModal.module.css';

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

interface CityDetailModalProps {
  city: City;
  onClose: () => void;
}

export default function CityDetailModal({ city, onClose }: CityDetailModalProps) {
  const metrics = city.city_metrics;

  useEffect(() => {
    // Close modal on Escape key
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [onClose]);

  const getMetricColor = (value: number) => {
    if (value >= 75) return '#22c55e';
    if (value >= 50) return '#eab308';
    return '#ef4444';
  };

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <button className={styles.closeButton} onClick={onClose}>
          ✕
        </button>

        {city.image_url && (
          <div className={styles.imageContainer}>
            <img src={city.image_url} alt={city.name} className={styles.image} />
          </div>
        )}

        <div className={styles.content}>
          <h2 className={styles.title}>{city.name}</h2>
          <p className={styles.subtitle}>
            {city.country} • {city.region}
          </p>

          {city.description && (
            <p className={styles.description}>{city.description}</p>
          )}

          <div className={styles.info}>
            <div className={styles.infoItem}>
              <span className={styles.infoLabel}>Population</span>
              <span className={styles.infoValue}>
                {(city.population / 1000000).toFixed(1)}M
              </span>
            </div>
          </div>

          {metrics && (
            <div className={styles.metricsSection}>
              <h3 className={styles.metricsTitle}>City Metrics</h3>

              <div className={styles.metricsGrid}>
                <div className={styles.metricCard}>
                  <span className={styles.metricName}>Cost of Living</span>
                  <div className={styles.metricValue}>
                    <span style={{ color: getMetricColor(metrics.cost_index) }}>
                      {metrics.cost_index}
                    </span>
                    <span className={styles.metricUnit}>/100</span>
                  </div>
                  <div className={styles.metricBar}>
                    <div
                      style={{
                        width: `${metrics.cost_index}%`,
                        backgroundColor: getMetricColor(metrics.cost_index),
                      }}
                    />
                  </div>
                </div>

                <div className={styles.metricCard}>
                  <span className={styles.metricName}>Safety Index</span>
                  <div className={styles.metricValue}>
                    <span style={{ color: getMetricColor(metrics.safety_index) }}>
                      {metrics.safety_index}
                    </span>
                    <span className={styles.metricUnit}>/100</span>
                  </div>
                  <div className={styles.metricBar}>
                    <div
                      style={{
                        width: `${metrics.safety_index}%`,
                        backgroundColor: getMetricColor(metrics.safety_index),
                      }}
                    />
                  </div>
                </div>

                <div className={styles.metricCard}>
                  <span className={styles.metricName}>Internet Speed</span>
                  <div className={styles.metricValue}>
                    <span>{metrics.internet_speed_mbps}</span>
                    <span className={styles.metricUnit}>Mbps</span>
                  </div>
                </div>

                <div className={styles.metricCard}>
                  <span className={styles.metricName}>Visa Ease</span>
                  <div className={styles.metricValue}>
                    <span style={{ color: getMetricColor(metrics.visa_ease_index) }}>
                      {metrics.visa_ease_index}
                    </span>
                    <span className={styles.metricUnit}>/100</span>
                  </div>
                </div>

                <div className={styles.metricCard}>
                  <span className={styles.metricName}>Average Temperature</span>
                  <div className={styles.metricValue}>
                    <span>{metrics.climate_temp_avg}</span>
                    <span className={styles.metricUnit}>°C</span>
                  </div>
                </div>

                <div className={styles.metricCard}>
                  <span className={styles.metricName}>LGBTQ+ Friendly</span>
                  <div className={styles.metricValue}>
                    <span style={{ color: getMetricColor(metrics.lgbtq_friendly_index) }}>
                      {metrics.lgbtq_friendly_index}
                    </span>
                    <span className={styles.metricUnit}>/100</span>
                  </div>
                </div>

                <div className={styles.metricCard}>
                  <span className={styles.metricName}>Air Quality Index</span>
                  <div className={styles.metricValue}>
                    <span style={{ color: getMetricColor(100 - metrics.air_quality_index) }}>
                      {metrics.air_quality_index}
                    </span>
                    <span className={styles.metricUnit}>/100</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          <button className={styles.rateButton} onClick={onClose}>
            Rate This City (Coming Soon)
          </button>
        </div>
      </div>
    </div>
  );
}
