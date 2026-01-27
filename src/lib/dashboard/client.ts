import apiClient, { executeApi } from "@lib/http/api-client";

export const getDashboardData = () =>
  executeApi<DashboardData>(() => apiClient.get("/dashboard"));
