import { apiClient, executeApi } from "../lib";
import type {
  CategoryQueryResponse,
  CategoryQueryType,
  CategoryResponse,
  CategoryType,
  ContentViewResponse,
  ContentViewType,
  PostQueryResponse,
  PostQueryType,
  PostResponse,
  PostType,
  TagQueryResponse,
  TagQueryType,
  TagResponse,
  TagType,
} from "@workspace/contracts/content";

export const getCategories = (params?: CategoryQueryType) =>
  executeApi<CategoryQueryResponse>(() =>
    apiClient.get("/categories", { params }),
  );

export const getCategoryBySlug = (slug: string) =>
  executeApi<CategoryResponse>(() => apiClient.get(`/categories/${slug}`));

export const createCategory = (data: CategoryType) =>
  executeApi<CategoryResponse>(() =>
    apiClient.post("/admin/content/categories", data),
  );

export const getAdminCategories = (params?: CategoryQueryType) =>
  executeApi<CategoryQueryResponse>(() =>
    apiClient.get("/admin/content/categories", { params }),
  );

export const getAdminCategory = (id: string) =>
  executeApi<CategoryResponse>(() =>
    apiClient.get(`/admin/content/categories/${id}`),
  );

export const updateCategory = (id: string, data: CategoryType) =>
  executeApi<CategoryResponse>(() =>
    apiClient.put(`/admin/content/categories/${id}`, data),
  );

export const deleteCategory = (id: string, force = false) =>
  executeApi<null>(() =>
    apiClient.delete(`/admin/content/categories/${id}`, { params: { force } }),
  );

export const restoreCategory = (id: string) =>
  executeApi<null>(() =>
    apiClient.post(`/admin/content/categories/${id}/restore`),
  );

export const getTags = (params?: TagQueryType) =>
  executeApi<TagQueryResponse>(() => apiClient.get("/tags", { params }));

export const getTagBySlug = (slug: string) =>
  executeApi<TagResponse>(() => apiClient.get(`/tags/${slug}`));

export const createTag = (data: TagType) =>
  executeApi<TagResponse>(() => apiClient.post("/admin/content/tags", data));

export const getAdminTags = (params?: TagQueryType) =>
  executeApi<TagQueryResponse>(() =>
    apiClient.get("/admin/content/tags", { params }),
  );

export const getAdminTag = (id: string) =>
  executeApi<TagResponse>(() => apiClient.get(`/admin/content/tags/${id}`));

export const updateTag = (id: string, data: TagType) =>
  executeApi<TagResponse>(() =>
    apiClient.put(`/admin/content/tags/${id}`, data),
  );

export const deleteTag = (id: string, force = false) =>
  executeApi<null>(() =>
    apiClient.delete(`/admin/content/tags/${id}`, { params: { force } }),
  );

export const restoreTag = (id: string) =>
  executeApi<null>(() => apiClient.post(`/admin/content/tags/${id}/restore`));

export const getPosts = (params?: PostQueryType) =>
  executeApi<PostQueryResponse>(() => apiClient.get("/posts", { params }));

export const getPostBySlug = (slug: string) =>
  executeApi<PostResponse>(() => apiClient.get(`/posts/${slug}`));

export const createPost = (data: PostType) =>
  executeApi<PostResponse>(() => apiClient.post("/admin/content/posts", data));

export const getAdminPosts = (params?: PostQueryType) =>
  executeApi<PostQueryResponse>(() =>
    apiClient.get("/admin/content/posts", { params }),
  );

export const getAdminPost = (id: string) =>
  executeApi<PostResponse>(() => apiClient.get(`/admin/content/posts/${id}`));

export const updatePost = (id: string, data: PostType) =>
  executeApi<PostResponse>(() =>
    apiClient.put(`/admin/content/posts/${id}`, data),
  );

export const deletePost = (id: string, force = false) =>
  executeApi<null>(() =>
    apiClient.delete(`/admin/content/posts/${id}`, { params: { force } }),
  );

export const restorePost = (id: string) =>
  executeApi<null>(() => apiClient.post(`/admin/content/posts/${id}/restore`));

export const createContentView = (data: ContentViewType) =>
  executeApi<ContentViewResponse>(() => apiClient.post("/content/views", data));
