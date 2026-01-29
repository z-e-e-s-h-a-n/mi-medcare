import z from "zod";
import { baseQuerySchema, idSchema } from "./shared";
import { TagSearchByEnum, TagSortByEnum } from "./enums";

export const CUTagSchema = z.object({
  parentId: idSchema.optional(),
  name: z.string({ error: "Name is required" }).min(3, "Name too short"),
  slug: z.string({ error: "Slug is required" }).min(3, "Slug too short"),
  description: z.string().optional(),
});

export const tagQuerySchema = baseQuerySchema(TagSortByEnum, TagSearchByEnum);
