import type z from "zod";
import { Tag } from "@generated/prisma";
import { CUTagSchema, tagQuerySchema } from "@schemas/tags";

declare global {
  /* ======================================================
     Tags — TYPES
  ===================================================== */

  // client
  type CUTagType = z.input<typeof CUTagSchema>;
  type TagQueryType = z.input<typeof tagQuerySchema>;

  // server
  type CUTagDto = z.output<typeof CUTagSchema>;
  type TagQueryDto = z.output<typeof tagQuerySchema>;

  /* ======================================================
     Tags — RESPONSES
  ===================================================== */

  interface TagResponse extends Tag, BaseResponse {
    parent?: TagResponse;
    children: TagResponse[];
    posts: PostResponse[];
  }

  interface TagQueryResponse extends BaseQueryResponse {
    tags: TagResponse[];
  }
}

export {};
