import { publicEnv } from "@lib/core/public-env";
import axios from "axios";
import type { AxiosInstance, AxiosResponse } from "axios";
import { ApiException } from "./http-exception";
export const API_URL = publicEnv.NEXT_PUBLIC_API_ENDPOINT;

export const apiClient: AxiosInstance = axios.create({
  baseURL: API_URL,
  withCredentials: true,
  timeout: 30_000,
  headers: {
    "Content-Type": "application/json",
  },
});

export const executeApi = async <T>(
  fn: () => Promise<AxiosResponse<ApiResponse<T>>>,
): Promise<ApiSuccess<T>> => {
  try {
    const response = await fn();
    const payload = response.data;

    if (!payload.success) {
      throw new ApiException(payload);
    }

    return payload;
  } catch (err: unknown) {
    if (err instanceof ApiException) {
      throw err;
    }

    if (axios.isAxiosError(err)) {
      const res = err.response?.data;

      throw new ApiException({
        message: res?.message ?? "Network error",
        status: res?.status ?? 0,
        data: res?.data ?? null,
        action: res?.action,
      });
    }

    throw new ApiException({
      message: "Unexpected error",
      status: 0,
      data: null,
    });
  }
};

export default apiClient;
