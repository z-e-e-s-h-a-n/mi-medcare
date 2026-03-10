import { apiClient, executeApi } from "../lib";
import type {
  ContactMessageQueryDto,
  ContactMessageQueryResponse,
  ContactMessageResponse,
  CreateContactMessageDto,
  UpdateContactMessageDto,
} from "@workspace/contracts/contact";

// Public route to create a new contact message
export const createContactMessage = (data: CreateContactMessageDto) =>
  executeApi<null>(() => apiClient.post("/contact", data));

// Admin routes
export const getContactMessages = (params?: ContactMessageQueryDto) =>
  executeApi<ContactMessageQueryResponse>(() =>
    apiClient.get("/contact", { params }),
  );

export const getContactMessage = (id: string) =>
  executeApi<ContactMessageResponse>(() => apiClient.get(`/contact/${id}`));

export const replyContactMessage = (
  id: string,
  data: UpdateContactMessageDto,
) => executeApi<null>(() => apiClient.put(`/contact/${id}/reply`, data));
