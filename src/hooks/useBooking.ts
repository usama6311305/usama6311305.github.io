// src/hooks/useBooking.ts
import { useState } from 'react';
import storeApi from '@/services/storeApi';
import { BookingRequest, BookingResponse } from '@/types/business';

export const useBooking = (businessId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [bookingResponse, setBookingResponse] = useState<BookingResponse | null>(null);

  const createBooking = async (
    bookingData: BookingRequest,
    authToken?: string
  ): Promise<BookingResponse> => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await storeApi.createBooking(businessId, bookingData, authToken);
      setBookingResponse(response);
      
      if (!response.success) {
        setError(response.message || 'Booking failed');
      }
      
      return response;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An unexpected error occurred';
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const resetBooking = () => {
    setBookingResponse(null);
    setError(null);
  };

  return {
    createBooking,
    loading,
    error,
    bookingResponse,
    resetBooking,
  };
};