// src/services/storeApi.ts
import apiService from './api';
import { 
  BusinessSearchResponse, 
  BusinessWithServices, 
  BusinessAvailability,
  BookingRequest,
  BookingResponse 
} from '@/types/business';

export class StoreApi {
  async searchBusinesses(params: {
    serviceName?: string;
    location?: string;
    page?: number;
    limit?: number;
  }): Promise<BusinessSearchResponse> {
    return apiService.searchBusinesses(params);
  }

  async getBusinessDetails(businessId: string): Promise<{
    success: boolean;
    data: BusinessWithServices;
  }> {
    return apiService.getBusinessById(businessId);
  }

  async getAvailability(businessId: string): Promise<{
    success: boolean;
    data: BusinessAvailability;
  }> {
    return apiService.getBusinessAvailability(businessId);
  }

  async createBooking(
    businessId: string, 
    bookingData: BookingRequest,
    authToken?: string
  ): Promise<BookingResponse> {
    return apiService.createBooking(businessId, bookingData, authToken);
  }
}

export default new StoreApi();