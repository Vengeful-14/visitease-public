// API Configuration - Public app (no authentication required)
// In production, use relative URL (same origin) to avoid mixed content issues
// In development, use the configured API URL or default to localhost
const getBaseURL = () => {
  // If VITE_API_URL is explicitly set, use it
  if (import.meta.env?.VITE_API_URL) {
    return import.meta.env.VITE_API_URL;
  }
  
  // In production (when served over HTTPS), use relative URL
  // This ensures API calls use the same protocol as the page (HTTPS)
  if (typeof window !== 'undefined' && window.location.protocol === 'https:') {
    return ''; // Relative URL - uses same origin and protocol
  }
  
  // In development, default to localhost
  return 'http://localhost:3000';
};

export const API_CONFIG = {
  BASE_URL: getBaseURL(),
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

