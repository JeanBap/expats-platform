'use client';

import styles from './FilterPanel.module.css';

export interface FilterOptions {
  region: string;
  minCost: number;
  maxCost: number;
  minSafety: number;
  search: string;
}

interface FilterPanelProps {
  filters: FilterOptions;
  onFilterChange: (filters: FilterOptions) => void;
  regions: string[];
}

export default function FilterPanel({
  filters,
  onFilterChange,
  regions,
}: FilterPanelProps) {
  const handleChange = (updates: Partial<FilterOptions>) => {
    onFilterChange({ ...filters, ...updates });
  };

  const handleReset = () => {
    onFilterChange({
      region: '',
      minCost: 0,
      maxCost: 100,
      minSafety: 0,
      search: '',
    });
  };

  return (
    <div className={styles.panel}>
      <div className={styles.header}>
        <h2>Filter Cities</h2>
        <button className={styles.resetButton} onClick={handleReset}>
          Reset
        </button>
      </div>

      <div className={styles.filterGroup}>
        <label htmlFor="search" className={styles.label}>
          Search
        </label>
        <input
          id="search"
          type="text"
          placeholder="City name..."
          value={filters.search}
          onChange={(e) => handleChange({ search: e.target.value })}
          className={styles.input}
        />
      </div>

      <div className={styles.filterGroup}>
        <label htmlFor="region" className={styles.label}>
          Region
        </label>
        <select
          id="region"
          value={filters.region}
          onChange={(e) => handleChange({ region: e.target.value })}
          className={styles.select}
        >
          <option value="">All Regions</option>
          {regions.map((region) => (
            <option key={region} value={region}>
              {region}
            </option>
          ))}
        </select>
      </div>

      <div className={styles.filterGroup}>
        <label className={styles.label}>Cost of Living</label>
        <div className={styles.rangeGroup}>
          <div className={styles.rangeItem}>
            <label htmlFor="minCost" className={styles.sublabel}>
              Min
            </label>
            <input
              id="minCost"
              type="range"
              min="0"
              max="100"
              value={filters.minCost}
              onChange={(e) => handleChange({ minCost: parseInt(e.target.value) })}
              className={styles.range}
            />
            <span className={styles.rangeValue}>{filters.minCost}</span>
          </div>

          <div className={styles.rangeItem}>
            <label htmlFor="maxCost" className={styles.sublabel}>
              Max
            </label>
            <input
              id="maxCost"
              type="range"
              min="0"
              max="100"
              value={filters.maxCost}
              onChange={(e) => handleChange({ maxCost: parseInt(e.target.value) })}
              className={styles.range}
            />
            <span className={styles.rangeValue}>{filters.maxCost}</span>
          </div>
        </div>
      </div>

      <div className={styles.filterGroup}>
        <label htmlFor="minSafety" className={styles.label}>
          Minimum Safety: {filters.minSafety}%
        </label>
        <input
          id="minSafety"
          type="range"
          min="0"
          max="100"
          value={filters.minSafety}
          onChange={(e) => handleChange({ minSafety: parseInt(e.target.value) })}
          className={styles.range}
        />
      </div>

      <div className={styles.info}>
        <p>💡 Adjust filters to discover cities that match your lifestyle</p>
      </div>
    </div>
  );
}
