// src/components/store/BookingModal.tsx
"use client";

import { useState } from 'react';
import { Business, Service, BookingRequest } from '@/types/business';
import { useBooking } from '@/hooks/useBooking';
import { formatCurrency } from '@/utils/helpers';

interface BookingModalProps {
  business: Business;
  services: Service[];
  isOpen: boolean;
  onClose: () => void;
  selectedService?: Service;
  authToken?: string;
}

export default function BookingModal({ 
  business, 
  services, 
  isOpen, 
  onClose,
  selectedService: initialService,
  authToken 
}: BookingModalProps) {
  const [selectedService, setSelectedService] = useState<Service | null>(initialService || null);
  const [bookingDate, setBookingDate] = useState('');
  const [bookingTime, setBookingTime] = useState('');
  const [clientName, setClientName] = useState('');
  const [clientEmail, setClientEmail] = useState('');
  const [clientPhone, setClientPhone] = useState('');
  const [bookingNotes, setBookingNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [bookingError, setBookingError] = useState<string | null>(null);

  const { createBooking } = useBooking(business.id);

  if (!isOpen) return null;

  // Get today's date for min date
  const today = new Date().toISOString().split('T')[0];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate required fields
    if (!selectedService) {
      setBookingError('Please select a service');
      return;
    }
    if (!bookingDate) {
      setBookingError('Please select a date');
      return;
    }
    if (!bookingTime) {
      setBookingError('Please select a time');
      return;
    }
    if (!clientName || !clientEmail || !clientPhone) {
      setBookingError('Please fill in all required fields');
      return;
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(clientEmail)) {
      setBookingError('Please enter a valid email address');
      return;
    }

    setIsSubmitting(true);
    setBookingError(null);

    try {
      const bookingData: BookingRequest = {
        appoDate: bookingDate,
        appoFromTime: bookingTime,
        serviceIds: [selectedService.id],
        packageIds: [],
        clientName: clientName,
        clientEmail: clientEmail,
        clientPhone: clientPhone,
        appoNotes: bookingNotes || undefined,
        bookingChannel: 'website',
      };

      const response = await createBooking(bookingData, authToken);

      if (response.success) {
        setBookingSuccess(true);
        // Reset form after success
        setTimeout(() => {
          onClose();
          // Reset form
          setBookingDate('');
          setBookingTime('');
          setClientName('');
          setClientEmail('');
          setClientPhone('');
          setBookingNotes('');
          setBookingSuccess(false);
        }, 3000);
      } else {
        setBookingError(response.message || 'Booking failed. Please try again.');
      }
    } catch (err) {
      setBookingError(err instanceof Error ? err.message : 'An unexpected error occurred');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose}></div>
      
      <div 
        className="relative bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl animate-slide-up"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="sticky top-4 float-right z-20 w-10 h-10 bg-white rounded-full shadow-lg hover:bg-gray-100 transition flex items-center justify-center m-4"
        >
          ✕
        </button>

        <div className="p-6 pt-0">
          {/* Header */}
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-800">📅 Book Appointment</h2>
            <p className="text-gray-500">
              Book your appointment at <span className="font-semibold text-purple-600">{business.businessName}</span>
            </p>
          </div>

          {bookingSuccess ? (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">✅</div>
              <h3 className="text-2xl font-bold text-green-600">Booking Confirmed!</h3>
              <p className="text-gray-600 mt-2">Your appointment has been successfully booked.</p>
              <p className="text-sm text-gray-400 mt-4">You will receive a confirmation email shortly.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              {/* Service Selection */}
              <div className="mb-4">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Select Service *
                </label>
                <select
                  value={selectedService?.id || ''}
                  onChange={(e) => {
                    const service = services.find(s => s.id === e.target.value);
                    setSelectedService(service || null);
                  }}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  required
                >
                  <option value="">Choose a service...</option>
                  {services.map((service) => (
                    <option key={service.id} value={service.id}>
                      {service.serviceName} - {formatCurrency(service.servicePrice)} ({service.serviceDuration} min)
                    </option>
                  ))}
                </select>
              </div>

              {/* Selected Service Details */}
              {selectedService && (
                <div className="bg-purple-50 p-3 rounded-lg mb-4">
                  <p className="text-sm text-gray-600">Selected Service:</p>
                  <p className="font-semibold text-purple-700">{selectedService.serviceName}</p>
                  <p className="text-sm text-gray-500">
                    {formatCurrency(selectedService.servicePrice)} • {selectedService.serviceDuration} minutes
                  </p>
                  {selectedService.serviceNote && (
                    <p className="text-xs text-gray-400 mt-1">{selectedService.serviceNote}</p>
                  )}
                </div>
              )}

              {/* Date & Time */}
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Date *
                  </label>
                  <input
                    type="date"
                    value={bookingDate}
                    onChange={(e) => setBookingDate(e.target.value)}
                    min={today}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Time *
                  </label>
                  <input
                    type="time"
                    value={bookingTime}
                    onChange={(e) => setBookingTime(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                    required
                  />
                </div>
              </div>

              {/* Client Information */}
              <div className="mb-4">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  value={clientName}
                  onChange={(e) => setClientName(e.target.value)}
                  placeholder="Your full name"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    value={clientEmail}
                    onChange={(e) => setClientEmail(e.target.value)}
                    placeholder="you@example.com"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Phone *
                  </label>
                  <input
                    type="tel"
                    value={clientPhone}
                    onChange={(e) => setClientPhone(e.target.value)}
                    placeholder="(555) 000-0000"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                    required
                  />
                </div>
              </div>

              {/* Notes */}
              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Additional Notes
                </label>
                <textarea
                  value={bookingNotes}
                  onChange={(e) => setBookingNotes(e.target.value)}
                  placeholder="Any special requests or notes..."
                  rows={2}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none"
                />
              </div>

              {/* Error Message */}
              {bookingError && (
                <div className="mb-4 p-3 bg-red-50 text-red-600 rounded-lg text-sm">
                  ⚠️ {bookingError}
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full py-3 rounded-xl font-semibold transition ${
                  isSubmitting
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    : 'bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:opacity-90'
                }`}
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center gap-2">
                    <span className="animate-spin">⏳</span>
                    Booking...
                  </span>
                ) : (
                  '📅 Book Appointment'
                )}
              </button>

              <p className="text-xs text-gray-400 text-center mt-4">
                By booking, you agree to our terms and conditions
              </p>
            </form>
          )}
        </div>
      </div>

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
    </div>
  );
}