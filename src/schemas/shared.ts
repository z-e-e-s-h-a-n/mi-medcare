import { z, ZodType } from "zod";
import { SortOrderEnum, BaseSortByEnum } from "./enums";

/* ======================================================
     SHARED UTILS — SCHEMA
  ===================================================== */

export const idSchema = z.string().min(1, "Invalid Id");

export const numberSchema = z.coerce.number<number>().int().min(1);

export const isoDateSchema = z.iso
  .datetime({ message: "Invalid Date" })
  .transform((value) => new Date(value));

/* ======================================================
     SHARED QUERY — SCHEMA
  ===================================================== */

export const baseQuerySchema = <
  TSortBy extends ZodType,
  TSearchBy extends ZodType,
>(
  sortByEnum: TSortBy,
  searchByEnum: TSearchBy,
) => {
  const sortByWithCreatedAt = z.literal(BaseSortByEnum.options).or(sortByEnum);

  return z.object({
    page: numberSchema.default(1),
    limit: numberSchema.default(10),

    sortBy: sortByWithCreatedAt.default("createdAt"),
    sortOrder: SortOrderEnum.default("desc"),

    search: z.string().optional(),
    searchBy: searchByEnum.optional(),
  });
};
