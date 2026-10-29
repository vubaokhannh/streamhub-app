import { ApiResponse } from '@/types';

/**
 * Base HTTP API client wrapper
 */
export class ApiService {
  private baseUrl: string;

  constructor(baseUrl: string = '') {
    this.baseUrl = baseUrl;
  }

  async get<T>(endpoint: string, headers?: HeadersInit): Promise<ApiResponse<T>> {
    try {
      const response = await fetch(`${this.baseUrl}${endpoint}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          ...headers,
        },
      });

      const data = await response.json();
      return {
        data,
        error: response.ok ? null : (data?.message ?? 'Request failed'),
        status: response.status,
      };
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Network error';
      return {
        data: null,
        error: message,
        status: 500,
      };
    }
  }

  async post<T>(endpoint: string, body: unknown, headers?: HeadersInit): Promise<ApiResponse<T>> {
    try {
      const response = await fetch(`${this.baseUrl}${endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...headers,
        },
        body: JSON.stringify(body),
      });

      const data = await response.json();
      return {
        data,
        error: response.ok ? null : (data?.message ?? 'Request failed'),
        status: response.status,
      };
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Network error';
      return {
        data: null,
        error: message,
        status: 500,
      };
    }
  }
}

export const apiService = new ApiService();
