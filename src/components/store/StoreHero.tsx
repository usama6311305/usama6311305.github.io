// src/components/store/StoreHero.tsx
"use client";

import SearchBar from './SearchBar';
import { useTheme, colorSchemes } from '@/context/ThemeContext';

interface StoreHeroProps {
  onSearch: (serviceName: string, location: string) => void;
}

export default function StoreHero({ onSearch }: StoreHeroProps) {
  const { color } = useTheme();
  const colors = colorSchemes[color];

  return (
    <section className={`bg-gradient-to-r ${colors.primary} py-16 md:py-24 px-4 transition-colors duration-200`}>
      <div className="max-w-4xl mx-auto text-center text-white">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">
          Find the Best Services<br />
          <span className="text-yellow-300">Near You</span>
        </h1>
        <p className="text-white/80 text-lg mb-8 max-w-2xl mx-auto">
          Discover top-rated businesses, compare prices, and book appointments instantly
        </p>
        
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
          <SearchBar onSearch={onSearch} />
        </div>
        
        <div className="mt-8 flex justify-center gap-8 text-sm flex-wrap">
          <div className="flex items-center gap-2">
            <span className="text-yellow-300">⭐</span>
            <span>4.8 Average Rating</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-yellow-300">🏆</span>
            <span>10,000+ Bookings</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-yellow-300">💳</span>
            <span>Instant Booking</span>
          </div>
        </div>
      </div>
    </section>
  );
}