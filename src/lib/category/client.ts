import apiClient, { executeApi } from "@lib/http/api-client";


export const createCategory = (data: CUCategoryType) =>
    executeApi<CategoryResponse>(() =>
        apiClient.post("/categories", data)
    );

export const findAllCategories = (params?: CategoryQueryType) =>
    executeApi<CategoryQueryResponse>(() =>
        apiClient.get("/categories", { params })
    );

export const findOneCategory = (id: string) =>
    executeApi<CategoryResponse>(() =>
        apiClient.get(`/categories/${id}`)
    );

export const updateCategory = (id: string, data: CUCategoryType) =>
    executeApi<CategoryResponse>(() =>
        apiClient.put(`/categories/${id}`, data)
    );

export const restoreCategory = (id: string,) =>
    executeApi<CategoryResponse>(() =>
        apiClient.post(`/categories/${id}/restore`,)
    );


export const removeCategory = (id: string, force = false) =>
    executeApi<CategoryResponse>(() =>
        apiClient.delete(`/categories/${id}`, { params: { force } })
    );
