import z from "zod";
import { baseQuerySchema, idSchema } from "./shared";
import { TagSearchByEnum, TagSortByEnum } from "./enums";

export const CUTagSchema = z.object({
  parentId: idSchema.optional(),
  name: z.string().min(1, "Name is required"),
  slug: z.string().min(1, "Slug is required"),
  description: z.string().optional(),
});

export const tagQuerySchema = baseQuerySchema(TagSortByEnum, TagSearchByEnum);
