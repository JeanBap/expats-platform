"use client";
import { useState, useEffect } from "react";
import CityDetailModal from "./components/CityDetailModal";
import RatingDisplay from "./components/RatingDisplay";
import RatingForm from "./components/RatingForm";
import styles from "./page.module.css";

interface City {
  id: string;
  name: string;
  region: string;
  description: string;
  avgRating: number;
  totalRatings: number;
}

const ITALIAN_CITIES: City[] = [
  { id: "1", name: "Rome", region: "Lazio", description: "Capital city", avgRating: 4.5, totalRatings: 120 },
  { id: "2", name: "Milan", region: "Lombardy", description: "Business hub", avgRating: 4.3, totalRatings: 95 },
  { id: "3", name: "Florence", region: "Tuscany", description: "Art and culture", avgRating: 4.7, totalRatings: 150 },
  { id: "4", name: "Venice", region: "Veneto", description: "Unique canals", avgRating: 4.4, totalRatings: 110 },
  { id: "5", name: "Naples", region: "Campania", description: "Mediterranean coast", avgRating: 4.2, totalRatings: 85 },
  { id: "6", name: "Bologna", region: "Emilia-Romagna", description: "Food capital", avgRating: 4.6, totalRatings: 130 },
  { id: "7", name: "Genoa", region: "Liguria", description: "Port city", avgRating: 4.1, totalRatings: 70 },
  { id: "8", name: "Turin", region: "Piedmont", description: "Industrial center", avgRating: 4.0, totalRatings: 60 },
  { id: "9", name: "Palermo", region: "Sicily", description: "Island charm", avgRating: 4.5, totalRatings: 100 },
  { id: "10", name: "Bari", region: "Apulia", description: "Adriatic gateway", avgRating: 4.3, totalRatings: 75 },
  { id: "11", name: "Verona", region: "Veneto", description: "Romeo and Juliet", avgRating: 4.6, totalRatings: 105 },
  { id: "12", name: "Pisa", region: "Tuscany", description: "Leaning tower", avgRating: 4.4, totalRatings: 90 },
  { id: "13", name: "Siena", region: "Tuscany", description: "Medieval town", avgRating: 4.7, totalRatings: 115 },
  { id: "14", name: "Lucca", region: "Tuscany", description: "Walled city", avgRating: 4.8, totalRatings: 85 },
  { id: "15", name: "Ravenna", region: "Emilia-Romagna", description: "Mosaic art", avgRating: 4.5, totalRatings: 70 },
  { id: "16", name: "Amalfi", region: "Campania", description: "Coastal paradise", avgRating: 4.9, totalRatings: 95 },
  { id: "17", name: "Sorrento", region: "Campania", description: "Lemon coast", avgRating: 4.7, totalRatings: 110 },
  { id: "18", name: "Capri", region: "Campania", description: "Island luxury", avgRating: 4.8, totalRatings: 120 },
  { id: "19", name: "Portovenere", region: "Liguria", description: "Riviera gem", avgRating: 4.9, totalRatings: 80 },
  { id: "20", name: "Cinque Terre", region: "Liguria", description: "Clifftop villages", avgRating: 4.9, totalRatings: 100 },
];

export default function Home() {
  const [selectedCity, setSelectedCity] = useState<City | null>(null);
  const [cities, setCities] = useState<City[]>(ITALIAN_CITIES);

  return (
    <main className={styles.container}>
      <h1>Expats Platform Italy</h1>
      <div className={styles.grid}>
        {cities.map((city) => (
          <div key={city.id} className={styles.card} onClick={() => setSelectedCity(city)}>
            <h2>{city.name}</h2>
            <p>{city.region}</p>
            <RatingDisplay avgRating={city.avgRating} totalRatings={city.totalRatings} />
          </div>
        ))}
      </div>
      {selectedCity && (
        <CityDetailModal
          city={selectedCity}
          onClose={() => setSelectedCity(null)}
        />
      )}
    </main>
  );
}
