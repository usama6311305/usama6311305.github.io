// src/services/api.ts
import axios, { AxiosInstance, AxiosError } from 'axios';
import { BookingRequest, BookingResponse } from '@/types/business';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://api.appointset.com/api/v1';

export class ApiService {
  private client: AxiosInstance;

  constructor() {
    this.client = axios.create({
      baseURL: API_BASE_URL,
      headers: {
        'Content-Type': 'application/json',
        'Accept': '*/*',
      },
      timeout: 30000,
    });

    this.setupInterceptors();
  }

  private setupInterceptors() {
    this.client.interceptors.response.use(
      (response) => response,
      (error: AxiosError) => {
        if (error.response) {
          console.error('API Error:', error.response.data);
          throw new Error((error.response.data as any)?.message || 'Something went wrong');
        } else if (error.request) {
          console.error('No response from server:', error.request);
          throw new Error('No response from server. Please check your connection.');
        } else {
          console.error('Request error:', error.message);
          throw new Error(error.message);
        }
      }
    );
  }

  async searchBusinesses(params: {
    serviceName?: string;
    location?: string;
    page?: number;
    limit?: number;
  }) {
    const { serviceName, location, page = 1, limit = 24 } = params;
    
    const queryParams = new URLSearchParams();
    if (serviceName) queryParams.append('serviceName', serviceName);
    if (location) queryParams.append('location', location);
    queryParams.append('page', page.toString());
    queryParams.append('limit', limit.toString());
    
    const response = await this.client.get(`/website/businesses/search?${queryParams.toString()}`);
    return response.data;
  }

  async getBusinessById(businessId: string) {
    const response = await this.client.get(`/website/businesses/by-id/${businessId}`);
    return response.data;
  }

  async getBusinessAvailability(businessId: string) {
    const response = await this.client.get(`/website/businesses/by-id/${businessId}/availability`);
    return response.data;
  }

  async createBooking(businessId: string, bookingData: BookingRequest, authToken?: string): Promise<BookingResponse> {
    try {
      const headers: any = {
        'Content-Type': 'application/json',
        'Accept': '*/*',
      };
      
      if (authToken) {
        headers['Authorization'] = `Bearer ${authToken}`;
      }
      
      const response = await this.client.post(
        `/website/businesses/by-id/${businessId}/booking`,
        bookingData,
        { headers }
      );
      
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        return {
          success: false,
          message: error.response.data?.message || 'Booking failed',
          error: error.response.data?.error || 'Bad Request',
          statusCode: error.response.status,
          timestamp: new Date().toISOString(),
        };
      }
      throw error;
    }
  }
}

export default new ApiService();