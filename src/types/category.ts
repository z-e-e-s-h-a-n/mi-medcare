import type z from "zod";
import {
  CUCategorySchema,
  categoryQuerySchema,
} from "@schemas/category";
import { Category } from "@generated/prisma";

declare global {
  /* ======================================================
     CATEGORY — TYPES
  ===================================================== */

  // client
  type CUCategoryType = z.input<typeof CUCategorySchema>;
  type CategoryQueryType = z.input<typeof categoryQuerySchema>;

  // server
  type CUCategoryDto = z.output<typeof CUCategorySchema>;
  type CategoryQueryDto = z.output<typeof categoryQuerySchema>;

  /* ======================================================
     CATEGORY — RESPONSES
  ===================================================== */

  interface CategoryResponse extends Category, BaseResponse {
    parent?: CategoryResponse
    children: CategoryResponse[]
    posts: PostResponse[]
  }

  interface CategoryQueryResponse extends BaseQueryResponse {
    categories: CategoryResponse[];
  }
}

export { };
