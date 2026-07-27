// src/types/business.ts
export interface Business {
  id: string;
  slug: string;
  businessName: string;
  businessType: string;
  businessDescription: string;
  businessEmail: string;
  businessPhone: string;
  brandColor: string;
  logoUrl: string | null;
  street: string;
  city: string;
  stateProvince: string;
  zipPostalCode: string;
  country: string;
  website: string | null;
  mapLat: string;
  mapLng: string;
  listingCountryCode: string;
  listingAdminAreaSlug: string;
  listingCitySlug: string;
  galleryUrls: string[];
  coverImageUrl: string;
  amenityTags: string[];
  listingDescription: string;
  averageRating: number;
  reviewCount: number;
  featured: boolean;
  listingRank: number;
}

export interface Service {
  id: string;
  serviceName: string;
  serviceDuration: number;
  servicePrice: string;
  serviceColor: string;
  serviceNote: string;
  serviceCategoryId: string;
  serviceCategoryName: string;
}

export interface BusinessWithServices {
  business: Business;
  services: Service[];
}

export interface BusinessSearchResponse {
  success: boolean;
  data: {
    items: BusinessWithServices[];
    page: number;
    limit: number;
    total: number;
  };
  statusCode: number;
  timestamp: string;
}

export interface BusinessAvailability {
  isAvailable: boolean;
  status: 'open' | 'closed' | 'busy' | 'available';
  nextAvailableTime?: string;
  message?: string;
}

// Booking Types
export interface BookingRequest {
  appoDate: string;
  appoFromTime: string;
  serviceIds: string[];
  packageIds?: string[];
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  appoNotes?: string;
  bookingChannel: 'website' | 'app' | 'phone';
}

export interface BookingResponse {
  success: boolean;
  message?: string;
  data?: {
    bookingId: string;
    appointmentDate: string;
    appointmentTime: string;
    status: string;
  };
  error?: string;
  statusCode: number;
  timestamp: string;
  path?: string;
}

export interface AppointmentSlot {
  date: string;
  time: string;
  available: boolean;
  serviceId?: string;
}