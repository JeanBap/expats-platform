"use client";
import { useState } from "react";
import CityDetailModal from "./components/CityDetailModal";
import styles from "./page.module.css";

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
  id: number;
  name: string;
  country: string;
  description: string;
  image_url: string;
  population: number;
  city_metrics: CityMetrics;
  avgRating?: number;
  totalRatings?: number;
}

const ITALIAN_CITIES: City[] = [
  { id: 1, name: "Rome", country: "Italy", description: "The Eternal City — capital of Italy and seat of the Vatican, offering unmatched history, culture and expat infrastructure.", image_url: "", population: 2872800, avgRating: 4.5, totalRatings: 120, city_metrics: { cost_index: 65, internet_speed_mbps: 85, safety_index: 68, visa_ease_index: 80, climate_temp_avg: 17, lgbtq_friendly_index: 72, air_quality_index: 58 } },
  { id: 2, name: "Milan", country: "Italy", description: "Italy's financial and fashion capital with excellent international connections and a thriving expat community.", image_url: "", population: 1366180, avgRating: 4.3, totalRatings: 95, city_metrics: { cost_index: 55, internet_speed_mbps: 110, safety_index: 72, visa_ease_index: 82, climate_temp_avg: 13, lgbtq_friendly_index: 80, air_quality_index: 50 } },
  { id: 3, name: "Florence", country: "Italy", description: "Renaissance heart of Tuscany, beloved for its art, architecture and world-class cuisine.", image_url: "", population: 367150, avgRating: 4.7, totalRatings: 150, city_metrics: { cost_index: 62, internet_speed_mbps: 90, safety_index: 78, visa_ease_index: 78, climate_temp_avg: 16, lgbtq_friendly_index: 74, air_quality_index: 65 } },
  { id: 4, name: "Venice", country: "Italy", description: "Unique canal city built on islands — incomparable beauty with a slower pace of life.", image_url: "", population: 255000, avgRating: 4.4, totalRatings: 110, city_metrics: { cost_index: 58, internet_speed_mbps: 75, safety_index: 82, visa_ease_index: 76, climate_temp_avg: 14, lgbtq_friendly_index: 70, air_quality_index: 70 } },
  { id: 5, name: "Naples", country: "Italy", description: "Vibrant Mediterranean city — birthplace of pizza, rich culture and affordable living.", image_url: "", population: 959470, avgRating: 4.2, totalRatings: 85, city_metrics: { cost_index: 75, internet_speed_mbps: 70, safety_index: 58, visa_ease_index: 75, climate_temp_avg: 18, lgbtq_friendly_index: 60, air_quality_index: 55 } },
  { id: 6, name: "Bologna", country: "Italy", description: "Italy's food capital with a prestigious university, progressive politics and a fantastic quality of life.", image_url: "", population: 391000, avgRating: 4.6, totalRatings: 130, city_metrics: { cost_index: 68, internet_speed_mbps: 95, safety_index: 80, visa_ease_index: 80, climate_temp_avg: 14, lgbtq_friendly_index: 82, air_quality_index: 60 } },
  { id: 7, name: "Genoa", country: "Italy", description: "Historic port city on the Ligurian coast — affordable, atmospheric and underrated by expats.", image_url: "", population: 583601, avgRating: 4.1, totalRatings: 70, city_metrics: { cost_index: 72, internet_speed_mbps: 80, safety_index: 70, visa_ease_index: 76, climate_temp_avg: 16, lgbtq_friendly_index: 68, air_quality_index: 62 } },
  { id: 8, name: "Turin", country: "Italy", description: "Elegant Piedmontese city — birthplace of Italian unification, home to great food and a growing tech scene.", image_url: "", population: 870456, avgRating: 4.0, totalRatings: 60, city_metrics: { cost_index: 70, internet_speed_mbps: 88, safety_index: 74, visa_ease_index: 78, climate_temp_avg: 13, lgbtq_friendly_index: 76, air_quality_index: 55 } },
  { id: 9, name: "Palermo", country: "Italy", description: "Sicily's capital — a melting pot of Arab-Norman architecture, street food and year-round sunshine.", image_url: "", population: 676118, avgRating: 4.5, totalRatings: 100, city_metrics: { cost_index: 80, internet_speed_mbps: 65, safety_index: 62, visa_ease_index: 74, climate_temp_avg: 20, lgbtq_friendly_index: 58, air_quality_index: 68 } },
  { id: 10, name: "Bari", country: "Italy", description: "Gateway to the Adriatic — lively southern city with excellent seafood, low costs and strong community feel.", image_url: "", population: 315000, avgRating: 4.3, totalRatings: 75, city_metrics: { cost_index: 78, internet_speed_mbps: 68, safety_index: 65, visa_ease_index: 74, climate_temp_avg: 19, lgbtq_friendly_index: 60, air_quality_index: 70 } },
  { id: 11, name: "Verona", country: "Italy", description: "City of Romeo and Juliet — beautiful medieval centre, excellent wines and easy access to the Dolomites.", image_url: "", population: 257353, avgRating: 4.6, totalRatings: 105, city_metrics: { cost_index: 64, internet_speed_mbps: 92, safety_index: 82, visa_ease_index: 80, climate_temp_avg: 14, lgbtq_friendly_index: 72, air_quality_index: 65 } },
  { id: 12, name: "Pisa", country: "Italy", description: "University city famous for its leaning tower — compact, affordable and well-connected to Florence.", image_url: "", population: 91104, avgRating: 4.4, totalRatings: 90, city_metrics: { cost_index: 70, internet_speed_mbps: 85, safety_index: 80, visa_ease_index: 78, climate_temp_avg: 16, lgbtq_friendly_index: 72, air_quality_index: 68 } },
  { id: 13, name: "Siena", country: "Italy", description: "Medieval gem of Tuscany — one of Italy's best-preserved historic centres with a relaxed pace of life.", image_url: "", population: 53901, avgRating: 4.7, totalRatings: 115, city_metrics: { cost_index: 66, internet_speed_mbps: 78, safety_index: 85, visa_ease_index: 76, climate_temp_avg: 15, lgbtq_friendly_index: 70, air_quality_index: 72 } },
  { id: 14, name: "Lucca", country: "Italy", description: "Perfectly preserved walled Tuscan city — peaceful, walkable and highly rated by expats for quality of life.", image_url: "", population: 89046, avgRating: 4.8, totalRatings: 85, city_metrics: { cost_index: 67, internet_speed_mbps: 80, safety_index: 88, visa_ease_index: 78, climate_temp_avg: 15, lgbtq_friendly_index: 71, air_quality_index: 74 } },
  { id: 15, name: "Ravenna", country: "Italy", description: "UNESCO mosaic capital — underrated city with stunning Byzantine art, low costs and high quality of life.", image_url: "", population: 159116, avgRating: 4.5, totalRatings: 70, city_metrics: { cost_index: 72, internet_speed_mbps: 82, safety_index: 84, visa_ease_index: 78, climate_temp_avg: 14, lgbtq_friendly_index: 72, air_quality_index: 68 } },
  { id: 16, name: "Amalfi", country: "Italy", description: "Clifftop coastal paradise on the Tyrrhenian Sea — dramatic scenery and la dolce vita at its finest.", image_url: "", population: 5090, avgRating: 4.9, totalRatings: 95, city_metrics: { cost_index: 52, internet_speed_mbps: 55, safety_index: 85, visa_ease_index: 74, climate_temp_avg: 20, lgbtq_friendly_index: 65, air_quality_index: 82 } },
  { id: 17, name: "Sorrento", country: "Italy", description: "Clifftop lemon coast town overlooking the Bay of Naples — popular expat base for the Amalfi area.", image_url: "", population: 16561, avgRating: 4.7, totalRatings: 110, city_metrics: { cost_index: 56, internet_speed_mbps: 60, safety_index: 82, visa_ease_index: 75, climate_temp_avg: 20, lgbtq_friendly_index: 64, air_quality_index: 80 } },
  { id: 18, name: "Capri", country: "Italy", description: "Island of luxury and natural beauty in the Gulf of Naples — exclusive but breathtaking year-round.", image_url: "", population: 14500, avgRating: 4.8, totalRatings: 120, city_metrics: { cost_index: 45, internet_speed_mbps: 50, safety_index: 90, visa_ease_index: 73, climate_temp_avg: 21, lgbtq_friendly_index: 68, air_quality_index: 88 } },
  { id: 19, name: "Portovenere", country: "Italy", description: "UNESCO Riviera gem — tiny walled village between the Cinque Terre and La Spezia with spectacular scenery.", image_url: "", population: 3753, avgRating: 4.9, totalRatings: 80, city_metrics: { cost_index: 58, internet_speed_mbps: 58, safety_index: 88, visa_ease_index: 76, climate_temp_avg: 17, lgbtq_friendly_index: 70, air_quality_index: 85 } },
  { id: 20, name: "Cinque Terre", country: "Italy", description: "Five clifftop fishing villages on the Ligurian coast — iconic scenery and a uniquely Italian way of life.", image_url: "", population: 7000, avgRating: 4.9, totalRatings: 100, city_metrics: { cost_index: 55, internet_speed_mbps: 52, safety_index: 87, visa_ease_index: 76, climate_temp_avg: 17, lgbtq_friendly_index: 70, air_quality_index: 86 } },
];

export default function Home() {
  const [selectedCity, setSelectedCity] = useState<City | null>(null);

  return (
    <main className={styles.container}>
      <h1>Expats Platform Italy</h1>
      <p className={styles.subtitle}>Discover the best Italian cities for expat life</p>
      <div className={styles.grid}>
        {ITALIAN_CITIES.map((city) => (
          <div key={city.id} className={styles.card} onClick={() => setSelectedCity(city)}>
            <h2>{city.name}</h2>
            <p className={styles.region}>{city.country}</p>
            <p className={styles.description}>{city.description.slice(0, 80)}...</p>
            <div className={styles.ratingPreview}>
              <span>{"★".repeat(Math.round(city.avgRating ?? 0))}{"☆".repeat(5 - Math.round(city.avgRating ?? 0))}</span>
              <span className={styles.ratingCount}> {city.avgRating}/5 ({city.totalRatings} ratings)</span>
            </div>
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
