import z from "zod";
import { baseQuerySchema, idSchema, isoDateSchema } from "./shared";
import { PostStatusEnum, PostSearchByEnum, PostSortByEnum } from "./enums";

export const TagSchema = z.object({
  name: z.string({ error: "Tag is required" }).min(3, "Tag too short"),
});

export const CUPostSchema = z.object({
  categoryId: idSchema,
  title: z.string({ error: "Title is required" }).min(10, "Title too short"),
  slug: z.string({ error: "Slug is required" }).min(10, "Slug too short"),
  excerpt: z
    .string({ error: "Excerpt is required" })
    .min(10, "Excerpt too short"),
  content: z
    .string({ error: "Content is required" })
    .min(20, "Content too short"),
  coverId: idSchema,
  tags: z.array(TagSchema).default([]),
  status: PostStatusEnum.default("draft"),
  metaTitle: z
    .string({ error: "Meta title is required" })
    .min(10, "Meta title too short"),
  metaDescription: z
    .string({ error: "Meta description is required" })
    .min(10, "Meta description too short"),
});

export const postQuerySchema = baseQuerySchema(
  PostSortByEnum,
  PostSearchByEnum,
).extend({
  status: PostStatusEnum.optional(),
});
