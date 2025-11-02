// Booking service - Public (create only)
import { baseApi } from './baseApi';
import { API_CONFIG } from '../config/api';

export interface CreateBookingData {
  slotId: string;
  visitor: {
    name: string;
    email: string;
    phone?: string;
    organization?: string;
    visitorType?: string;
    specialRequirements?: string;
    country?: string;
  };
  groupSize: number;
  specialRequests?: string;
}

export interface Booking {
  id: string;
  slotId: string;
  visitorId: string;
  groupSize: number;
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed' | 'no_show' | 'tentative';
  specialRequests?: string;
  trackingToken?: string;
  createdAt: string;
}

export interface AvailabilityCheck {
  available: boolean;
  capacity: number;
  booked: number;
  remaining: number;
  canAccommodate: boolean;
}

export const bookingService = {
  // Check booking availability
  async checkAvailability(slotId: string, groupSize: number) {
    const response = await baseApi.get<AvailabilityCheck>(
      `${API_CONFIG.ENDPOINTS.BOOKINGS.CHECK_AVAILABILITY(slotId)}?groupSize=${groupSize}`
    );
    
    if (response.success && response.data) {
      const apiData = response.data as any;
      if (apiData.success && apiData.data) {
        return {
          success: true,
          data: apiData.data,
          error: undefined,
        };
      }
      return {
        success: true,
        data: apiData as AvailabilityCheck,
        error: undefined,
      };
    }
    
    return {
      success: false,
      data: undefined,
      error: response.error || 'Failed to check availability',
    };
  },

  // Create new booking
  async createBooking(data: CreateBookingData) {
    const response = await baseApi.post<{
      success: boolean;
      message: string;
      data: Booking;
    }>(API_CONFIG.ENDPOINTS.BOOKINGS.CREATE, data);
    
    if (response.success && response.data) {
      const apiData = response.data as any;
      if (apiData.success && apiData.data) {
        return {
          success: true,
          data: apiData.data,
          error: undefined,
        };
      }
      // Handle case where response is already the booking
      if (apiData.id) {
        return {
          success: true,
          data: apiData as Booking,
          error: undefined,
        };
      }
    }
    
    return {
      success: false,
      data: undefined,
      error: response.error || 'Failed to create booking',
    };
  },

  // Track booking by email and token
  async trackBooking(email: string, token: string) {
    const response = await baseApi.get<Booking>(
      `${API_CONFIG.ENDPOINTS.BOOKINGS.TRACK}?email=${encodeURIComponent(email)}&token=${encodeURIComponent(token)}`
    );
    
    if (response.success && response.data) {
      const apiData = response.data as any;
      if (apiData.success && apiData.data) {
        return {
          success: true,
          data: apiData.data,
          error: undefined,
        };
      }
      return {
        success: true,
        data: apiData as Booking,
        error: undefined,
      };
    }
    
    return {
      success: false,
      data: undefined,
      error: response.error || 'Failed to track booking',
    };
  },

  // Cancel booking by email and token
  async cancelBooking(email: string, token: string, reason: string) {
    const response = await baseApi.put<Booking>(
      API_CONFIG.ENDPOINTS.BOOKINGS.CANCEL,
      { email, token, reason }
    );
    
    if (response.success && response.data) {
      const apiData = response.data as any;
      if (apiData.success && apiData.data) {
        return {
          success: true,
          data: apiData.data,
          error: undefined,
        };
      }
      return {
        success: true,
        data: apiData as Booking,
        error: undefined,
      };
    }
    
    return {
      success: false,
      data: undefined,
      error: response.error || 'Failed to cancel booking',
    };
  },
};

export default bookingService;

