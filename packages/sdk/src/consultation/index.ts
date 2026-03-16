import { apiClient, executeApi } from "../lib";
import type {
  ConsultationRequestQueryResponse,
  ConsultationRequestQueryType,
  ConsultationRequestResponse,
  CreateConsultationRequestType,
  UpdateConsultationRequestType,
} from "@workspace/contracts/consultation";

// Public route to create consultation request
export const createConsultationRequest = (data: CreateConsultationRequestType) =>
  executeApi<null>(() => apiClient.post("/consultation", data));

// Admin: list consultation requests
export const listConsultationRequests = (
  params?: ConsultationRequestQueryType,
) =>
  executeApi<ConsultationRequestQueryResponse>(() =>
    apiClient.get("/consultation", { params }),
  );

// Admin: get single consultation request
export const getConsultationRequest = (id: string) =>
  executeApi<ConsultationRequestResponse>(() =>
    apiClient.get(`/consultation/${id}`),
  );

export const updateConsultationRequest = (
  id: string,
  data: UpdateConsultationRequestType,
) =>
  executeApi<ConsultationRequestResponse>(() =>
    apiClient.put(`/consultation/${id}`, data),
  );
