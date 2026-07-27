// src/components/store/BusinessDetailsModal.tsx
"use client";

import { Business, Service } from '@/types/business';
import { useBusinessAvailability } from '@/hooks/useBusiness';
import { formatCurrency, formatDuration, getInitials } from '@/utils/helpers';
import { useState } from 'react';
import BookingModal from './BookingModal';

interface BusinessDetailsModalProps {
  business: Business;
  services: Service[];
  isOpen: boolean;
  onClose: () => void;
}

export default function BusinessDetailsModal({ business, services, isOpen, onClose }: BusinessDetailsModalProps) {
  const { availability, loading: availabilityLoading } = useBusinessAvailability(business.id);
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [showBookingModal, setShowBookingModal] = useState(false);

  if (!isOpen) return null;

  const handleBookNow = () => {
    setShowBookingModal(true);
  };

  const handleCloseBooking = () => {
    setShowBookingModal(false);
  };

  // Get status color
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'open':
      case 'available':
        return 'bg-green-100 text-green-700';
      case 'closed':
        return 'bg-red-100 text-red-700';
      case 'busy':
        return 'bg-yellow-100 text-yellow-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'open':
      case 'available':
        return '✅';
      case 'closed':
        return '❌';
      case 'busy':
        return '⏳';
      default:
        return '🔄';
    }
  };

  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={onClose}>
        <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose}></div>
        
        <div 
          className="relative bg-white rounded-2xl max-w-5xl w-full max-h-[90vh] overflow-y-auto shadow-2xl animate-slide-up"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="sticky top-4 float-right z-20 w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:bg-white transition flex items-center justify-center m-4"
          >
            ✕
          </button>

          {/* Cover Image */}
          <div className="relative w-full h-80 overflow-hidden">
            <img
              src={business.coverImageUrl || 'https://images.unsplash.com/photo-1560066984-0cc0ec4c72a0?w=800&h=400&fit=crop'}
              alt={business.businessName}
              className="w-full h-full object-cover"
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = 'none';
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
            
            {/* Business Info Overlay */}
            <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
              <div className="flex items-end justify-between flex-wrap gap-4">
                <div>
                  {/* Business Name & Type */}
                  <h2 className="text-4xl font-bold mb-2">{business.businessName}</h2>
                  <div className="flex items-center gap-3 flex-wrap">
                    <span className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-sm">
                      {business.businessType}
                    </span>
                    {business.featured && (
                      <span className="bg-yellow-500/80 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-semibold">
                        ⭐ Featured
                      </span>
                    )}
                  </div>
                </div>
                
                {/* Rating */}
                {business.averageRating > 0 && (
                  <div className="flex items-center gap-2 bg-black/40 backdrop-blur-sm px-4 py-2 rounded-xl">
                    <span className="text-yellow-400 text-xl">⭐</span>
                    <span className="font-bold text-xl">{business.averageRating.toFixed(1)}</span>
                    <span className="text-white/60">({business.reviewCount} reviews)</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="p-8">
            <div className="grid md:grid-cols-3 gap-8">
              {/* Left Column - Details (2/3 width) */}
              <div className="md:col-span-2 space-y-6">
                {/* Description */}
                <div>
                  <h3 className="font-bold text-gray-700 mb-2 flex items-center gap-2">
                    <span>📋</span> About
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {business.businessDescription || business.listingDescription || 'No description available.'}
                  </p>
                </div>

                {/* Location */}
                <div>
                  <h3 className="font-bold text-gray-700 mb-2 flex items-center gap-2">
                    <span>📍</span> Location
                  </h3>
                  <div className="bg-gray-50 rounded-xl p-4">
                    <p className="text-gray-600">{business.street}</p>
                    <p className="text-gray-600">{business.city}, {business.stateProvince} {business.zipPostalCode}</p>
                    <p className="text-gray-600">{business.country}</p>
                  </div>
                </div>

                {/* Contact Info */}
                <div>
                  <h3 className="font-bold text-gray-700 mb-2 flex items-center gap-2">
                    <span>📞</span> Contact
                  </h3>
                  <div className="bg-gray-50 rounded-xl p-4 space-y-2">
                    <p className="text-gray-600 flex items-center gap-2">
                      <span>📱</span> {business.businessPhone}
                    </p>
                    <p className="text-gray-600 flex items-center gap-2">
                      <span>✉️</span> {business.businessEmail}
                    </p>
                    {business.website && (
                      <p className="text-gray-600 flex items-center gap-2">
                        <span>🌐</span> 
                        <a href={business.website} target="_blank" rel="noopener noreferrer" className="text-purple-600 hover:underline">
                          {business.website}
                        </a>
                      </p>
                    )}
                  </div>
                </div>

                {/* Amenities */}
                {business.amenityTags && business.amenityTags.length > 0 && (
                  <div>
                    <h3 className="font-bold text-gray-700 mb-2 flex items-center gap-2">
                      <span>✨</span> Amenities
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {business.amenityTags.map((tag, idx) => (
                        <span key={idx} className="px-3 py-1.5 bg-purple-50 text-purple-700 rounded-full text-sm">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Gallery */}
                {business.galleryUrls && business.galleryUrls.length > 0 && (
                  <div>
                    <h3 className="font-bold text-gray-700 mb-2 flex items-center gap-2">
                      <span>🖼️</span> Gallery
                    </h3>
                    <div className="grid grid-cols-3 gap-2">
                      {business.galleryUrls.slice(0, 6).map((url, idx) => (
                        <div key={idx} className="aspect-square rounded-lg overflow-hidden bg-gray-100">
                          <img
                            src={url}
                            alt={`Gallery ${idx + 1}`}
                            className="w-full h-full object-cover hover:scale-105 transition duration-300"
                            onError={(e) => {
                              (e.target as HTMLImageElement).style.display = 'none';
                            }}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Services */}
                <div>
                  <h3 className="font-bold text-gray-700 mb-3 flex items-center gap-2">
                    <span>💇</span> Services ({services.length})
                  </h3>
                  <div className="grid gap-3">
                    {services.map((service) => (
                      <div
                        key={service.id}
                        className={`border rounded-xl p-4 cursor-pointer transition ${
                          selectedService?.id === service.id
                            ? 'border-purple-500 bg-purple-50 shadow-md'
                            : 'hover:border-purple-300 hover:bg-purple-50/50'
                        }`}
                        onClick={() => setSelectedService(service)}
                      >
                        <div className="flex justify-between items-start">
                          <div className="flex-1">
                            <div className="flex items-center gap-2">
                              <span 
                                className="w-3 h-3 rounded-full" 
                                style={{ backgroundColor: service.serviceColor || '#9C27B0' }}
                              ></span>
                              <h4 className="font-semibold text-gray-800">{service.serviceName}</h4>
                            </div>
                            <p className="text-sm text-gray-500">{service.serviceCategoryName}</p>
                            {service.serviceNote && (
                              <p className="text-xs text-gray-400 mt-1">{service.serviceNote}</p>
                            )}
                          </div>
                          <div className="text-right ml-4">
                            <span className="font-bold text-purple-600 text-lg">{formatCurrency(service.servicePrice)}</span>
                            <p className="text-xs text-gray-400">{formatDuration(service.serviceDuration)}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Column - Booking (1/3 width) */}
              <div className="md:col-span-1">
                <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-6 sticky top-4">
                  <h3 className="font-bold text-gray-700 mb-4 flex items-center gap-2">
                    <span>📅</span> Book Appointment
                  </h3>
                  
                  {/* Availability */}
                  <div className="mb-4">
                    <p className="text-sm font-semibold text-gray-600 mb-2">Availability</p>
                    {availabilityLoading ? (
                      <div className="p-3 bg-white rounded-lg">
                        <div className="animate-pulse flex items-center gap-2">
                          <div className="w-3 h-3 bg-gray-300 rounded-full"></div>
                          <span className="text-gray-400">Checking availability...</span>
                        </div>
                      </div>
                    ) : availability ? (
                      <div className={`p-3 rounded-lg ${availability.isAvailable ? 'bg-green-100' : 'bg-yellow-100'}`}>
                        <div className="flex items-center gap-2">
                          <span className={`w-2 h-2 rounded-full ${
                            availability.isAvailable ? 'bg-green-500' : 'bg-yellow-500'
                          }`}></span>
                          <span className="text-gray-700 font-medium">
                            {getStatusIcon(availability.status)} {availability.isAvailable ? 'Available now' : 'Currently busy'}
                          </span>
                        </div>
                        {availability.nextAvailableTime && (
                          <p className="text-sm text-gray-600 mt-1">
                            Next available: {new Date(availability.nextAvailableTime).toLocaleString()}
                          </p>
                        )}
                        {availability.message && (
                          <p className="text-sm text-gray-600 mt-1">{availability.message}</p>
                        )}
                      </div>
                    ) : (
                      <div className="p-3 bg-gray-100 rounded-lg">
                        <p className="text-gray-400">No availability data</p>
                      </div>
                    )}
                  </div>

                  {/* Selected Service */}
                  {selectedService && (
                    <div className="mb-4 p-3 bg-white rounded-lg border border-purple-200">
                      <p className="text-sm text-gray-500">Selected Service</p>
                      <p className="font-semibold text-gray-800">{selectedService.serviceName}</p>
                      <div className="flex justify-between items-center mt-1">
                        <span className="text-purple-600 font-bold">{formatCurrency(selectedService.servicePrice)}</span>
                        <span className="text-sm text-gray-500">{formatDuration(selectedService.serviceDuration)}</span>
                      </div>
                    </div>
                  )}

                  {/* Book Button */}
                  <button
                    onClick={handleBookNow}
                    disabled={!selectedService}
                    className={`w-full py-3 rounded-xl font-semibold transition ${
                      selectedService
                        ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:opacity-90 shadow-lg hover:shadow-xl'
                        : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                    }`}
                  >
                    {selectedService ? '📅 Book Now' : 'Select a service first'}
                  </button>

                  {/* Quick Info */}
                  <div className="mt-4 pt-4 border-t border-purple-200 space-y-2 text-sm">
                    <p className="text-gray-500 flex items-center gap-2">
                      <span>📍</span> {business.city}, {business.stateProvince}
                    </p>
                    <p className="text-gray-500 flex items-center gap-2">
                      <span>📞</span> {business.businessPhone}
                    </p>
                    <p className="text-gray-500 flex items-center gap-2">
                      <span>⭐</span> {business.averageRating.toFixed(1)} ({business.reviewCount} reviews)
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Close Button at Bottom */}
            <div className="mt-8 pt-6 border-t border-gray-200 text-center">
              <button
                onClick={onClose}
                className="px-8 py-2 bg-gray-200 text-gray-700 rounded-xl hover:bg-gray-300 transition font-medium"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Booking Modal */}
      <BookingModal
        business={business}
        services={services}
        isOpen={showBookingModal}
        onClose={handleCloseBooking}
        selectedService={selectedService || undefined}
        authToken={process.env.NEXT_PUBLIC_AUTH_TOKEN}
      />

      <style jsx>{`
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(30px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
        .animate-slide-up {
          animation: slideUp 0.3s ease-out;
        }
      `}</style>
    </>
  );
}