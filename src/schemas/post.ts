import z from "zod";
import { baseQuerySchema, idSchema, isoDateSchema } from "./shared";
import { PostStatusEnum, PostSearchByEnum, PostSortByEnum } from "./enums";

export const CUPostSchema = z.object({
  categoryId: idSchema.optional(),
  title: z.string().min(10, "Title is required"),
  slug: z.string().min(10, "Slug is required"),
  excerpt: z.string().optional(),
  content: z.string().min(20, "Content is required"),
  coverImage: z.string().optional(),
  tags: z.array(z.string().min(3)),
  status: PostStatusEnum.default("draft"),
  publishedAt: isoDateSchema.optional(),
  metaTitle: z.string().optional(),
  metaDescription: z.string().optional(),
});


export const postQuerySchema = baseQuerySchema(
  PostSortByEnum,
  PostSearchByEnum,
).extend({
  status: PostStatusEnum.optional(),
});
