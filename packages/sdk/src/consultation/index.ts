import { apiClient, executeApi } from "../lib";

// Public route to create consultation request
export const createConsultationRequest = (data: CreateConsultationRequestDto) =>
  executeApi<null>(() => apiClient.post("/consultation", data));

// Admin: list consultation requests
export const listConsultationRequests = (
  params?: ConsultationRequestQueryDto,
) =>
  executeApi<ConsultationRequestQueryResponse>(() =>
    apiClient.get("/consultation", { params }),
  );

// Admin: get single consultation request
export const getConsultationRequest = (id: string) =>
  executeApi<ConsultationRequestResponse>(() =>
    apiClient.get(`/consultation/${id}`),
  );
