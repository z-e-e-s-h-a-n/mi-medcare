import apiClient, { executeApi } from "@lib/http/api-client";

export const getCurrentUser = () =>
  executeApi<UserResponse>(() => apiClient.get("/user"));

export const updateProfile = (data: UserProfileType) =>
  executeApi(() => apiClient.post("/user", data));
