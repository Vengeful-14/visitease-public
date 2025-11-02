// Visitor service - Public (create only)
import { baseApi } from './baseApi';
import { API_CONFIG } from '../config/api';

export type VisitorType = 'individual' | 'family' | 'educational' | 'corporate' | 'group';

export interface CreateVisitorData {
  name: string;
  email: string;
  phone?: string;
  organization?: string;
  specialRequirements?: string;
  visitorType?: VisitorType;
  addressLine1?: string;
  addressLine2?: string;
  city?: string;
  state?: string;
  postalCode?: string;
  country?: string;
  emergencyContactName?: string;
  emergencyContactPhone?: string;
}

export interface Visitor {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  organization: string | null;
  visitorType: VisitorType;
  createdAt: string;
}

export const visitorService = {
  // Create new visitor
  async createVisitor(data: CreateVisitorData) {
    const response = await baseApi.post<{
      success: boolean;
      message: string;
      data: Visitor;
    }>(API_CONFIG.ENDPOINTS.VISITORS.CREATE, data);
    
    if (response.success && response.data) {
      const apiData = response.data as any;
      if (apiData.success && apiData.data) {
        return {
          success: true,
          data: apiData.data,
          error: undefined,
        };
      }
      // Handle case where response is already the visitor
      if (apiData.id) {
        return {
          success: true,
          data: apiData as Visitor,
          error: undefined,
        };
      }
    }
    
    return {
      success: false,
      data: undefined,
      error: response.error || 'Failed to create visitor',
    };
  },
};

export default visitorService;

