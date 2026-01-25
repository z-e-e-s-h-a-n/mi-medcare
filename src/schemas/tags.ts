import z from "zod";
import { baseQuerySchema, } from "./shared";
import { TagSearchByEnum, TagSortByEnum } from "./enums";

export const CUTagSchema = z.object({
  name: z.string().min(1, "Name is required"),
  slug: z.string().min(1, "Slug is required"),
});

export const tagQuerySchema = baseQuerySchema(
  TagSortByEnum,
  TagSearchByEnum,
);
