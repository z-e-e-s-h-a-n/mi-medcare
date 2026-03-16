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
  PageSearchByEnum,
  PageSortByEnum,
  PostSearchByEnum,
  PostSortByEnum,
  ProductStatusEnum,
  TagSearchByEnum,
  TagSortByEnum,
} from "../lib/enums";

export const categoryPayloadSchema = z.object({
  name: nameSchema,
  slug: z.string().min(1),
  description: z.string().optional(),
  parentId: idSchema.optional(),
});

export const tagPayloadSchema = z.object({
  name: nameSchema,
  slug: z.string().min(1),
});

export const pagePayloadSchema = z.object({
  title: z.string().min(1),
  slug: z.string().min(1),
  content: z.string().min(1),
  coverId: idSchema.optional(),
  metaTitle: z.string().optional(),
  metaDescription: z.string().optional(),
  status: ProductStatusEnum.default("draft"),
  publishedAt: isoDateSchema.optional(),
});

export const postPayloadSchema = z.object({
  categoryId: idSchema,
  title: z.string().min(1),
  slug: z.string().min(1),
  excerpt: z.string().min(1),
  content: z.string().min(1),
  coverId: idSchema.optional(),
  tagIds: z.array(idSchema).default([]),
  status: ProductStatusEnum.default("draft"),
  publishedAt: isoDateSchema.optional(),
  metaTitle: z.string().optional(),
  metaDescription: z.string().optional(),
  isFeatured: z.boolean().default(false),
});

export const contentViewPayloadSchema = z
  .object({
    postId: idSchema.optional(),
    pageId: idSchema.optional(),
    trafficSourceId: idSchema.optional(),
  })
  .refine((value) => !!value.postId !== !!value.pageId, {
    message: "Provide either postId or pageId.",
    path: ["postId"],
  });

export const categoryQuerySchema = baseQuerySchema(
  CategorySortByEnum,
  CategorySearchByEnum,
);

export const tagQuerySchema = baseQuerySchema(TagSortByEnum, TagSearchByEnum);

export const pageQuerySchema = baseQuerySchema(
  PageSortByEnum,
  PageSearchByEnum,
).extend({
  status: ProductStatusEnum.optional(),
});

export const postQuerySchema = baseQuerySchema(
  PostSortByEnum,
  PostSearchByEnum,
).extend({
  status: ProductStatusEnum.optional(),
  categoryId: idSchema.optional(),
  authorId: idSchema.optional(),
  tagId: idSchema.optional(),
  isFeatured: z.boolean().optional(),
});
