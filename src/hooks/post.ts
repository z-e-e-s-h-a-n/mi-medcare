import * as post from "@lib/post/client";
import { createCrudHooks } from "@/hooks/crud";

export const {
    useEntity: usePost,
    useEntities: usePosts,
    useRemoveEntity: useRemovePost,
    useRestoreEntity: useRestorePost,
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
    }
);
