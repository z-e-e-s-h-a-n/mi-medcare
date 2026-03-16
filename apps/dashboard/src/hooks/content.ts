"use client";

import * as content from "@workspace/sdk/content";
import { createCrudHooks } from "@/hooks/crud";

export const {
  useEntity: useCategory,
  useEntities: useCategories,
  useCreateEntity: useCreateCategory,
  useUpdateEntity: useUpdateCategory,
  useDeleteEntity: useDeleteCategory,
  useRestoreEntity: useRestoreCategory,
} = createCrudHooks(
  {
    findOne: content.getAdminCategory,
    findAll: content.getAdminCategories,
    create: content.createCategory,
    update: content.updateCategory,
    delete: content.deleteCategory,
    restore: content.restoreCategory,
  },
  {
    single: "category",
    list: "categoryList",
  },
);

export const {
  useEntity: useTag,
  useEntities: useTags,
  useCreateEntity: useCreateTag,
  useUpdateEntity: useUpdateTag,
  useDeleteEntity: useDeleteTag,
  useRestoreEntity: useRestoreTag,
} = createCrudHooks(
  {
    findOne: content.getAdminTag,
    findAll: content.getAdminTags,
    create: content.createTag,
    update: content.updateTag,
    delete: content.deleteTag,
    restore: content.restoreTag,
  },
  {
    single: "tag",
    list: "tagList",
  },
);

export const {
  useEntity: usePost,
  useEntities: usePosts,
  useCreateEntity: useCreatePost,
  useUpdateEntity: useUpdatePost,
  useDeleteEntity: useDeletePost,
  useRestoreEntity: useRestorePost,
} = createCrudHooks(
  {
    findOne: content.getAdminPost,
    findAll: content.getAdminPosts,
    create: content.createPost,
    update: content.updatePost,
    delete: content.deletePost,
    restore: content.restorePost,
  },
  {
    single: "post",
    list: "postList",
  },
);
