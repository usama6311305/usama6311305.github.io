// src/components/store/BusinessCard.tsx
"use client";

import { Business, Service } from '@/types/business';
import { formatCurrency, formatDuration } from '@/utils/helpers';
import { useState } from 'react';
import { useTheme, colorSchemes } from '@/context/ThemeContext';

interface BusinessCardProps {
  business: Business;
  services: Service[];
  onClick?: () => void;
}

export default function BusinessCard({ business, services, onClick }: BusinessCardProps) {
  const [showServices, setShowServices] = useState(false);
  const { color } = useTheme();
  const colors = colorSchemes[color];

  return (
    <div 
      className="bg-white dark:bg-gray-800 rounded-2xl shadow-md dark:shadow-gray-900/30 hover:shadow-2xl transition-all duration-300 overflow-hidden cursor-pointer group"
      onClick={onClick}
    >
      {/* Cover Image */}
      <div className="relative h-52 overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800">
        {business.coverImageUrl ? (
          <img
            src={business.coverImageUrl}
            alt={business.businessName}
            className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.style.display = 'none';
            }}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-6xl">
            💈
          </div>
        )}
        
        {/* Badges */}
        {business.featured && (
          <span className="absolute top-3 right-3 bg-yellow-500 text-white text-xs px-3 py-1 rounded-full font-semibold">
            ⭐ Featured
          </span>
        )}
        
        {/* Rating */}
        {business.averageRating > 0 && (
          <div className="absolute bottom-3 left-3 bg-black/70 backdrop-blur-sm text-white px-3 py-1.5 rounded-lg flex items-center gap-2">
            <span className="text-yellow-400">⭐</span>
            <span className="font-semibold">{business.averageRating.toFixed(1)}</span>
            <span className="text-gray-400 text-sm">({business.reviewCount})</span>
          </div>
        )}
        
        {/* Business Type */}
        <span className={`absolute bottom-3 right-3 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm text-gray-700 dark:text-gray-300 text-xs px-3 py-1.5 rounded-lg font-medium`}>
          {business.businessType}
        </span>
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className={`font-bold text-xl text-gray-800 dark:text-white group-hover:${colors.text} transition line-clamp-1`}>
          {business.businessName}
        </h3>
        
        <p className="text-gray-500 dark:text-gray-400 text-sm line-clamp-2 mb-3">
          {business.businessDescription || business.listingDescription}
        </p>
        
        {/* Location */}
        <div className="flex items-center gap-1 text-sm text-gray-400 dark:text-gray-500 mb-3">
          <span>📍</span>
          <span>{business.city}, {business.stateProvince}</span>
        </div>

        {/* Amenities */}
        {business.amenityTags && business.amenityTags.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-3">
            {business.amenityTags.slice(0, 3).map((tag, idx) => (
              <span key={idx} className={`text-xs ${colors.bg} ${colors.text} px-2 py-1 rounded-full dark:bg-opacity-20`}>
                {tag}
              </span>
            ))}
            {business.amenityTags.length > 3 && (
              <span className="text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 px-2 py-1 rounded-full">
                +{business.amenityTags.length - 3}
              </span>
            )}
          </div>
        )}

        {/* Services Preview */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            setShowServices(!showServices);
          }}
          className={`text-sm ${colors.text} hover:${colors.text} font-emdium flex items-center gap-1`}
        >
          {showServices ? 'Hide' : 'View'} Services ({services.length})
          <span className={`transform transition ${showServices ? 'rotate-180' : ''}`}>▼</span>
        </button>

        {showServices && services.length > 0 && (
          <div className="mt-3 space-y-2 border-t border-gray-100 dark:border-gray-700 pt-3">
            {services.slice(0, 3).map((service) => (
              <div key={service.id} className="flex justify-between items-center text-sm">
                <div className="flex items-center gap-2">
                  <span 
                    className="w-2 h-2 rounded-full" 
                    style={{ backgroundColor: service.serviceColor || '#9C27B0' }}
                  ></span>
                  <span className="text-gray-700 dark:text-gray-300">{service.serviceName}</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-gray-400 dark:text-gray-500 text-xs">{formatDuration(service.serviceDuration)}</span>
                  <span className={`font-semibold ${colors.text}`}>{formatCurrency(service.servicePrice)}</span>
                </div>
              </div>
            ))}
            {services.length > 3 && (
              <div className="text-center text-xs text-gray-400 dark:text-gray-500 pt-1">
                +{services.length - 3} more services
              </div>
            )}
          </div>
        )}

        {/* Book Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            if (onClick) onClick();
          }}
          className={`w-full mt-4 bg-gradient-to-r ${colors.primary} text-white py-2.5 rounded-xl hover:opacity-90 transition font-medium`}
        >
          📅 Book Now
        </button>
      </div>
    </div>
  );
}