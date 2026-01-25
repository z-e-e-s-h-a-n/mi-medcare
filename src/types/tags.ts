import type z from "zod";
import { CUTagSchema, tagQuerySchema } from "@schemas/tags";
import { Tag } from "@generated/prisma";

declare global {
  /* ======================================================
     TAG — TYPES
  ===================================================== */

  // client
  type CUTagType = z.input<typeof CUTagSchema>;
  type TagQueryType = z.input<typeof tagQuerySchema>;

  // server
  type CUTagDto = z.output<typeof CUTagSchema>;
  type TagQueryDto = z.output<typeof tagQuerySchema>;

  /* ======================================================
     TAG — RESPONSES
  ===================================================== */

  type TagResponse = Pick<Tag,
    "id" |
    "name" |
    "slug">
    & BaseResponse;

  interface TagQueryResponse extends BaseQueryResponse {
    tags: TagResponse[];
  }
}

export { };
