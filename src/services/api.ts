import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import * as SecureStore from 'expo-secure-store';
import { ApiResponse } from '@/types';

/**
 * Axios instance configured for API requests
 */
const api: AxiosInstance = axios.create({
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor to attach auth token
api.interceptors.request.use(
  async (config) => {
    try {
      const token = await SecureStore.getItemAsync('user_token');
      if (token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    } catch {
      // Ignore secure store read errors on web or unsupported platforms
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export class ApiService {
  async get<T>(url: string, config?: AxiosRequestConfig): Promise<ApiResponse<T>> {
    try {
      const response = await api.get<T>(url, config);
      return {
        data: response.data,
        error: null,
        status: response.status,
      };
    } catch (err: unknown) {
      const message = axios.isAxiosError(err)
        ? (err.response?.data?.message ?? err.message)
        : 'Network error';
      return {
        data: null,
        error: message,
        status: axios.isAxiosError(err) ? (err.response?.status ?? 500) : 500,
      };
    }
  }

  async post<T>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<ApiResponse<T>> {
    try {
      const response = await api.post<T>(url, data, config);
      return {
        data: response.data,
        error: null,
        status: response.status,
      };
    } catch (err: unknown) {
      const message = axios.isAxiosError(err)
        ? (err.response?.data?.message ?? err.message)
        : 'Network error';
      return {
        data: null,
        error: message,
        status: axios.isAxiosError(err) ? (err.response?.status ?? 500) : 500,
      };
    }
  }
}

export const apiService = new ApiService();
export { api };
