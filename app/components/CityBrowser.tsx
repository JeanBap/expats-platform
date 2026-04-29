'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/auth-config';
import CityCard from './CityCard';
import FilterPanel, { FilterOptions } from './FilterPanel';
import CityDetailModal from './CityDetailModal';
import styles from './CityBrowser.module.css';

interface City {
  id: string;
  name: string;
  country: string;
  image_url?: string;
  description?: string;
  population: number;
  region: string;
  city_metrics?: any;
}

export default function CityBrowser() {
  const [cities, setCities] = useState<City[]>([]);
  const [filteredCities, setFilteredCities] = useState<City[]>([]);
  const [regions, setRegions] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCity, setSelectedCity] = useState<City | null>(null);
  const [filters, setFilters] = useState<FilterOptions>({
    region: '',
    minCost: 0,
    maxCost: 100,
    minSafety: 0,
    search: '',
  });

  // Fetch cities from Supabase
  useEffect(() => {
    const fetchCities = async () => {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from('cities')
          .select(`
            *,
            city_metrics (
              cost_index,
              internet_speed_mbps,
              safety_index,
              visa_ease_index,
              climate_temp_avg,
              lgbtq_friendly_index,
              air_quality_index,
              source
            )
          `)
          .order('name');

        if (error) throw error;

        const citiesData = (data || []).map((city: any) => ({
          ...city,
          city_metrics: city.city_metrics?.[0] || null,
        }));

        setCities(citiesData);

        // Extract unique regions
        const uniqueRegions = Array.from(
          new Set(citiesData.map((c: City) => c.region).filter(Boolean))
        ) as string[];
        setRegions(uniqueRegions.sort());

        setLoading(false);
      } catch (error) {
        console.error('Error fetching cities:', error);
        setLoading(false);
      }
    };

    fetchCities();
  }, []);

  // Apply filters
  useEffect(() => {
    let result = cities;

    // Search filter
    if (filters.search) {
      result = result.filter(
        (city) =>
          city.name.toLowerCase().includes(filters.search.toLowerCase()) ||
          city.country.toLowerCase().includes(filters.search.toLowerCase())
      );
    }

    // Region filter
    if (filters.region) {
      result = result.filter((city) => city.region === filters.region);
    }

    // Cost filter
    result = result.filter((city) => {
      if (!city.city_metrics) return true;
      return (
        city.city_metrics.cost_index >= filters.minCost &&
        city.city_metrics.cost_index <= filters.maxCost
      );
    });

    // Safety filter
    result = result.filter((city) => {
      if (!city.city_metrics) return true;
      return city.city_metrics.safety_index >= filters.minSafety;
    });

    setFilteredCities(result);
  }, [filters, cities]);

  if (loading) {
    return <div className={styles.loading}>Loading cities...</div>;
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>Explore Cities</h1>
        <p>Find your ideal city based on cost, safety, climate, and more</p>
        <p className={styles.resultCount}>
          Showing {filteredCities.length} of {cities.length} cities
        </p>
      </div>

      <div className={styles.content}>
        <aside className={styles.sidebar}>
          <FilterPanel
            filters={filters}
            onFilterChange={setFilters}
            regions={regions}
          />
        </aside>

        <main className={styles.main}>
          {filteredCities.length > 0 ? (
            <div className={styles.grid}>
              {filteredCities.map((city) => (
                <CityCard
                  key={city.id}
                  city={city}
                  onSelect={setSelectedCity}
                />
              ))}
            </div>
          ) : (
            <div className={styles.empty}>
              <p>No cities match your filters.</p>
              <p className={styles.subtext}>Try adjusting your search criteria.</p>
            </div>
          )}
        </main>
      </div>

      {selectedCity && (
        <CityDetailModal
          city={selectedCity}
          onClose={() => setSelectedCity(null)}
        />
      )}
    </div>
  );
}
