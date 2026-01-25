import apiClient, { executeApi } from "@lib/http/api-client";


export const createPost = (data: CUPostType) =>
    executeApi<PostResponse>(() =>
        apiClient.post("/posts", data)
    );

export const findAllPosts = (params?: PostQueryType) =>
    executeApi<PostQueryResponse>(() =>
        apiClient.get("/posts", { params })
    );

export const findOnePost = (id: string) =>
    executeApi<PostResponse>(() =>
        apiClient.get(`/posts/${id}`)
    );

export const updatePost = (id: string, data: CUPostType) =>
    executeApi<PostResponse>(() =>
        apiClient.put(`/posts/${id}`, data)
    );

export const restorePost = (id: string,) =>
    executeApi<PostResponse>(() =>
        apiClient.post(`/posts/${id}/restore`,)
    );


export const removePost = (id: string, force = false) =>
    executeApi<PostResponse>(() =>
        apiClient.delete(`/posts/${id}`, { params: { force } })
    );
