// API Configuration - Public app (no authentication required)
export const API_CONFIG = {
  BASE_URL: (import.meta.env?.VITE_API_URL) || 'http://localhost:3000',
  ENDPOINTS: {
    // Schedule Management (Public)
    SCHEDULE: {
      SLOTS: '/api/v1/public/schedule/available-slots',
      SLOT: (id: string) => `/api/v1/public/schedule/slots/${id}`,
    },
    // Visitor Management (Public - Create only)
    VISITORS: {
      CREATE: '/api/v1/visitors',
    },
    // Booking Management (Public - Create only)
    BOOKINGS: {
      CREATE: '/api/v1/public/booking',
      CHECK_AVAILABILITY: (slotId: string) => `/api/v1/public/booking/availability/${slotId}`,
      TRACK: '/api/v1/public/booking/track',
      CANCEL: '/api/v1/public/booking/cancel',
      UPDATE: '/api/v1/public/booking/update',
    },
  },
  TIMEOUT: 10000, // 10 seconds
};

export default API_CONFIG;

