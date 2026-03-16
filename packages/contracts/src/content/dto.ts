import { createZodDto } from "nestjs-zod";

import {
  categoryPayloadSchema,
  categoryQuerySchema,
  contentViewPayloadSchema,
  pagePayloadSchema,
  pageQuerySchema,
  postPayloadSchema,
  postQuerySchema,
  tagPayloadSchema,
  tagQuerySchema,
} from "./schema";

export class CategoryDto extends createZodDto(categoryPayloadSchema) {}
export class CategoryQueryDto extends createZodDto(categoryQuerySchema) {}

export class TagDto extends createZodDto(tagPayloadSchema) {}
export class TagQueryDto extends createZodDto(tagQuerySchema) {}

export class PageDto extends createZodDto(pagePayloadSchema) {}
export class PageQueryDto extends createZodDto(pageQuerySchema) {}

export class PostDto extends createZodDto(postPayloadSchema) {}
export class PostQueryDto extends createZodDto(postQuerySchema) {}

export class ContentViewDto extends createZodDto(contentViewPayloadSchema) {}
