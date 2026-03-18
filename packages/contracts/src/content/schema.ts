import z from "zod";

import {
  baseQuerySchema,
  idSchema,
  isoDateSchema,
  nameSchema,
} from "../lib/schema";
import {
  CategorySearchByEnum,
  CategorySortByEnum,
  PostSearchByEnum,
  PostSortByEnum,
  PostStatusEnum,
  TagSearchByEnum,
  TagSortByEnum,
} from "../lib/enums";

export const CUCategorySchema = z.object({
  name: nameSchema,
  slug: z.string().min(1),
  description: z.string().optional(),
  parentId: idSchema.optional(),
});

export const CUTagSchema = z.object({
  name: nameSchema,
  slug: z.string().min(1),
});

export const CUPostSchema = z.object({
  categoryId: idSchema,
  title: z.string().min(1),
  slug: z.string().min(1),
  excerpt: z.string().min(1),
  content: z.string().min(1),
  coverId: idSchema.optional(),
  tagIds: z.array(idSchema).default([]),
  status: PostStatusEnum.default("draft"),
  publishedAt: isoDateSchema.optional(),
  metaTitle: z.string().optional(),
  metaDescription: z.string().optional(),
});

export const postViewSchema = z.object({
  postId: idSchema,
  trafficSourceId: idSchema.optional(),
  visitorKey: z.string().min(1).optional(),
});

export const categoryQuerySchema = baseQuerySchema(
  CategorySortByEnum,
  CategorySearchByEnum,
);

export const tagQuerySchema = baseQuerySchema(TagSortByEnum, TagSearchByEnum);

export const postQuerySchema = baseQuerySchema(
  PostSortByEnum,
  PostSearchByEnum,
).extend({
  status: PostStatusEnum.optional(),
  categoryId: idSchema.optional(),
  authorId: idSchema.optional(),
  tagId: idSchema.optional(),
});
