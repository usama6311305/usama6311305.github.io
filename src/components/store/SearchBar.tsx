// components/store/SearchBar.tsx
"use client";

import { useState } from 'react';

interface SearchBarProps {
  onSearch: (serviceName: string, location: string) => void;
  initialService?: string;
  initialLocation?: string;
}

export default function SearchBar({ onSearch, initialService = '', initialLocation = '' }: SearchBarProps) {
  const [serviceName, setServiceName] = useState(initialService);
  const [location, setLocation] = useState(initialLocation);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(serviceName, location);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-4 w-full">
      <div className="flex-1 relative">
        <input
          type="text"
          placeholder="🔍 What service? (e.g., haircut, massage)"
          value={serviceName}
          onChange={(e) => setServiceName(e.target.value)}
          className="w-full px-4 py-3 border-0 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
      </div>
      
      <div className="flex-1 relative">
        <input
          type="text"
          placeholder="📍 Location (e.g., Los Angeles)"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="w-full px-4 py-3 border-0 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
      </div>
      
      <button
        type="submit"
        className="px-8 py-3 bg-white text-purple-600 rounded-lg hover:bg-gray-100 transition font-semibold whitespace-nowrap"
      >
        Search →
      </button>
    </form>
  );
}