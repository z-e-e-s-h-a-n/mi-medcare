import type z from "zod";
import { CUPostSchema, postQuerySchema } from "@schemas/post";
import { Post } from "@generated/prisma";

declare global {
  /* ======================================================
     POST — TYPES
  ===================================================== */

  // client
  type CUPostType = z.input<typeof CUPostSchema>;
  type PostQueryType = z.input<typeof postQuerySchema>;

  // server
  type CUPostDto = z.output<typeof CUPostSchema>;
  type PostQueryDto = z.output<typeof postQuerySchema>;

  /* ======================================================
     POST — RESPONSES
  ===================================================== */

  interface PostResponse extends Post, BaseResponse {
    cover: MediaResponse;
    tags: TagResponse[];
    author: UserResponse;
    category: CategoryResponse;
  }

  interface PostQueryResponse extends BaseQueryResponse {
    posts: PostResponse[];
  }
}

export {};
