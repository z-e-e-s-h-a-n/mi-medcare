declare global {
  export interface BaseApiResponse {
    status: number;
    success: boolean;
    message: string;
    action?: string;
  }

  export interface ApiSuccess<T> extends BaseApiResponse {
    success: true;
    data: T;
    meta?: Record<string, string>;
  }

  export interface ApiError extends BaseApiResponse {
    success: false;
    data: null;
    message: string;
  }

  export type ApiResponse<T> = ApiSuccess<T> | ApiError;
}

export {};
