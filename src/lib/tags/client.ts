import apiClient, { executeApi } from "@lib/http/api-client";

export const createTag = (data: CUTagType) =>
  executeApi<TagResponse>(() => apiClient.post("/tags", data));

export const findAllTags = (params?: TagQueryType) =>
  executeApi<TagQueryResponse>(() => apiClient.get("/tags", { params }));

export const findOneTag = (id: string) =>
  executeApi<TagResponse>(() => apiClient.get(`/tags/${id}`));

export const updateTag = (id: string, data: CUTagType) =>
  executeApi<TagResponse>(() => apiClient.put(`/tags/${id}`, data));

export const restoreTag = (id: string) =>
  executeApi<TagResponse>(() => apiClient.post(`/tags/${id}/restore`));

export const removeTag = (id: string, force = false) =>
  executeApi<TagResponse>(() =>
    apiClient.delete(`/tags/${id}`, { params: { force } }),
  );
