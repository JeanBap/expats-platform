'use client'

import { useState } from 'react'
import CityDetailModal from './components/CityDetailModal'
import styles from './page.module.css'

const CITIES = [
  { id: 1, name: 'Rome', country: 'Italy', region: 'Lazio', image: 'https://images.unsplash.com/photo-1552832860-cfaf9d80ac5f?w=600&h=400&fit=crop' },
  { id: 2, name: 'Milan', country: 'Italy', region: 'Lombardy', image: 'https://images.unsplash.com/photo-1599599810694-b5ac4dd94837?w=600&h=400&fit=crop' },
  { id: 3, name: 'Florence', country: 'Italy', region: 'Tuscany', image: 'https://images.unsplash.com/photo-1535920527002-b35e96722eb9?w=600&h=400&fit=crop' },
  { id: 4, name: 'Venice', country: 'Italy', region: 'Veneto', image: 'https://images.unsplash.com/photo-1514565731684-f7ad40801f36?w=600&h=400&fit=crop' },
  { id: 5, name: 'Naples', country: 'Italy', region: 'Campania', image: 'https://images.unsplash.com/photo-1524850011238-e3d235e093d5?w=600&h=400&fit=crop' },
  { id: 6, name: 'Turin', country: 'Italy', region: 'Piedmont', image: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=600&h=400&fit=crop' },
  { id: 7, name: 'Bologna', country: 'Italy', region: 'Emilia-Romagna', image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=400&fit=crop' },
  { id: 8, name: 'Palermo', country: 'Italy', region: 'Sicily', image: 'https://images.unsplash.com/photo-1504681869696-d977e9d34c4b?w=600&h=400&fit=crop' },
  { id: 9, name: 'Siena', country: 'Italy', region: 'Tuscany', image: 'https://images.unsplash.com/photo-1520763185298-1b434c919abe?w=600&h=400&fit=crop' },
  { id: 10, name: 'Lucca', country: 'Italy', region: 'Tuscany', image: 'https://images.unsplash.com/photo-1501785886041-af0112dc9ab0?w=600&h=400&fit=crop' },
  { id: 11, name: 'Pisa', country: 'Italy', region: 'Tuscany', image: 'https://images.unsplash.com/photo-1523228114643-430f63602d4b?w=600&h=400&fit=crop' },
  { id: 12, name: 'Verona', country: 'Italy', region: 'Veneto', image: 'https://images.unsplash.com/photo-1475924156734-496f6cac6e44?w=600&h=400&fit=crop' },
  { id: 13, name: 'Catania', country: 'Italy', region: 'Sicily', image: 'https://images.unsplash.com/photo-1500211556336-f64e8b42d0a1?w=600&h=400&fit=crop' },
  { id: 14, name: 'Genoa', country: 'Italy', region: 'Liguria', image: 'https://images.unsplash.com/photo-1488099199537-2f5cf4867364?w=600&h=400&fit=crop' },
  { id: 15, name: 'Como', country: 'Italy', region: 'Lombardy', image: 'https://images.unsplash.com/photo-1530893609038-6304eee70738?w=600&h=400&fit=crop' },
  { id: 16, name: 'Taormina', country: 'Italy', region: 'Sicily', image: 'https://images.unsplash.com/photo-1571525201696-0199e0e9fb71?w=600&h=400&fit=crop' },
  { id: 17, name: 'Amalfi', country: 'Italy', region: 'Campania', image: 'https://images.unsplash.com/photo-1549882903-7c95a36f5f5b?w=600&h=400&fit=crop' },
  { id: 18, name: 'Sorrento', country: 'Italy', region: 'Campania', image: 'https://images.unsplash.com/photo-1516339901601-2e1b62dc0c45?w=600&h=400&fit=crop' },
  { id: 19, name: 'Positano', country: 'Italy', region: 'Campania', image: 'https://images.unsplash.com/photo-1549882903-7c95a36f5f5b?w=600&h=400&fit=crop' },
  { id: 20, name: 'Bari', country: 'Italy', region: 'Apulia', image: 'https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=600&h=400&fit=crop' },
]

export default function Home() {
  const [selectedCity, setSelectedCity] = useState<number | null>(null)

  const selectedCityData = selectedCity
    ? CITIES.find(c => c.id === selectedCity)
    : null

  const cityWithMetrics = selectedCityData ? {
    id: selectedCityData.id,
    name: selectedCityData.name,
    country: selectedCityData.country,
    description: `Discover the beauty and culture of ${selectedCityData.name}`,
    image_url: selectedCityData.image,
    population: 100000,
    city_metrics: {
      cost_index: 65,
      internet_speed_mbps: 100,
      safety_index: 75,
      visa_ease_index: 70,
      climate_temp_avg: 18,
      lgbtq_friendly_index: 80,
      air_quality_index: 72,
    }
  } : null

  return (
    <main className={styles.container}>
      <header className={styles.header}>
        <h1>Expats in Italy</h1>
        <p>Discover Italian cities and connect with expats</p>
      </header>

      <div className={styles.grid}>
        {CITIES.map((city) => (
          <div
            key={city.id}
            className={styles.card}
            onClick={() => setSelectedCity(city.id)}
          >
            <img src={city.image} alt={city.name} />
            <h2>{city.name}</h2>
            <p>{city.region}</p>
          </div>
        ))}
      </div>

      {cityWithMetrics && (
        <CityDetailModal city={cityWithMetrics} onClose={() => setSelectedCity(null)} />
      )}
    </main>
  )
}
