import { createZodDto } from "nestjs-zod";

import {
  CUTagSchema,
  CUPostSchema,
  CUCategorySchema,
  tagQuerySchema,
  postQuerySchema,
  categoryQuerySchema,
} from "./schema";

export class CategoryDto extends createZodDto(CUCategorySchema) {}
export class CategoryQueryDto extends createZodDto(categoryQuerySchema) {}

export class TagDto extends createZodDto(CUTagSchema) {}
export class TagQueryDto extends createZodDto(tagQuerySchema) {}

export class PostDto extends createZodDto(CUPostSchema) {}
export class PostQueryDto extends createZodDto(postQuerySchema) {}
