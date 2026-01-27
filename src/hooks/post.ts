import * as post from "@lib/post/client";
import { createCrudHooks } from "./crud";

export const {
  useEntity: usePost,
  useEntities: usePosts,
  useRemoveEntity: useRemovePost,
  useRestoreEntity: useRestorePost,
  useCreateEntity: useCreatePost,
  useUpdateEntity: useUpdatePost,
} = createCrudHooks(
  {
    findOne: post.findOnePost,
    findAll: post.findAllPosts,
    create: post.createPost,
    update: post.updatePost,
    remove: post.removePost,
    restore: post.restorePost,
  },
  {
    single: "post",
    list: "posts",
  },
);
