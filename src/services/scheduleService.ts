// Schedule service - Public
import { baseApi } from './baseApi';
import { API_CONFIG } from '../config/api';

export interface VisitSlot {
  id: string;
  date: string;
  startTime: string;
  endTime: string;
  capacity: number;
  booked: number;
  status: 'available' | 'booked' | 'cancelled' | 'maintenance' | 'expired';
  description?: string;
  durationMinutes: number;
  createdAt: string;
  updatedAt: string;
}

export interface SlotSearchFilters {
  date?: Date;
  dateFrom?: Date;
  dateTo?: Date;
  status?: string;
}

export const scheduleService = {
  // Get available slots (using public API endpoint - no auth required)
  async getAvailableSlots(filters?: SlotSearchFilters) {
    const params = new URLSearchParams();
    if (filters) {
      if (filters.dateFrom) {
        params.append('dateFrom', filters.dateFrom.toISOString().split('T')[0]);
      }
      if (filters.dateTo) {
        params.append('dateTo', filters.dateTo.toISOString().split('T')[0]);
      }
      if (filters.date && !filters.dateFrom && !filters.dateTo) {
        // If only a single date is provided, use it for both from and to
        const dateStr = filters.date.toISOString().split('T')[0];
        params.append('dateFrom', dateStr);
        params.append('dateTo', dateStr);
      }
    }
    
    const queryString = params.toString();
    const endpoint = queryString 
      ? `${API_CONFIG.ENDPOINTS.SCHEDULE.SLOTS}?${queryString}` 
      : API_CONFIG.ENDPOINTS.SCHEDULE.SLOTS;
    
    const response = await baseApi.get<{
      success: boolean;
      message: string;
      data: {
        slots: VisitSlot[];
        total: number;
      };
    }>(endpoint);
    
    if (response.success && response.data) {
      const apiData = response.data as any;
      if (apiData.success && apiData.data && apiData.data.slots) {
        // Transform bookedCount to booked for frontend compatibility
        const transformedSlots = apiData.data.slots.map((slot: any) => ({
          ...slot,
          booked: slot.bookedCount || slot.booked || 0
        }));
        return {
          success: true,
          data: transformedSlots,
          error: undefined,
        };
      }
    }
    
    return {
      success: false,
      data: undefined,
      error: response.error || 'Failed to load available slots',
    };
  },

  // Get specific slot by ID (using public API endpoint)
  async getSlot(id: string) {
    const response = await baseApi.get<{
      success: boolean;
      message: string;
      data: VisitSlot;
    }>(API_CONFIG.ENDPOINTS.SCHEDULE.SLOT(id));
    
    if (response.success && response.data) {
      const apiData = response.data as any;
      if (apiData.success && apiData.data) {
        // Transform bookedCount to booked for frontend compatibility
        const slot = apiData.data;
        return {
          success: true,
          data: {
            ...slot,
            booked: slot.bookedCount || slot.booked || 0
          },
          error: undefined,
        };
      }
    }
    
    return {
      success: false,
      data: undefined,
      error: response.error || 'Failed to load slot',
    };
  },
};

export default scheduleService;

