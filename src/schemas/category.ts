import z from "zod";
import { baseQuerySchema, idSchema, } from "./shared";
import { CategorySearchByEnum, CategorySortByEnum } from "./enums";

export const CUCategorySchema = z.object({
  parentId: idSchema.optional(),
  name: z.string().min(1, "Name is required"),
  slug: z.string().min(1, "Slug is required"),
  description: z.string().optional(),
});


export const categoryQuerySchema = baseQuerySchema(
  CategorySortByEnum,
  CategorySearchByEnum,
);
