// Axios-based base API service - Public (no authentication)
import axios from 'axios';
import { API_CONFIG } from '../config/api';

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}

// Create axios instance
const axiosInstance = axios.create({
  baseURL: API_CONFIG.BASE_URL,
  timeout: API_CONFIG.TIMEOUT,
  headers: { 'Content-Type': 'application/json' },
});

async function wrap<T>(p: Promise<any>): Promise<ApiResponse<T>> {
  try {
    const res = await p;
    return { success: true, data: res.data };
  } catch (err: any) {
    const message = err?.response?.data?.message || err?.message || 'Request failed';
    return { success: false, error: message };
  }
}

export const baseApi = {
  get<T>(endpoint: string, params?: any) {
    return wrap<T>(axiosInstance.get(endpoint, { params }));
  },
  post<T>(endpoint: string, data?: any) {
    return wrap<T>(axiosInstance.post(endpoint, data));
  },
  put<T>(endpoint: string, data?: any) {
    return wrap<T>(axiosInstance.put(endpoint, data));
  },
};

export default baseApi;

