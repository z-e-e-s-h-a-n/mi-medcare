import { z, ZodType } from "zod";
import { SortOrderEnum, BaseSortByEnum } from "./enums";

/* ======================================================
     SHARED UTILS — SCHEMA
  ===================================================== */

export const idSchema = z
  .string()
  .length(26, "Id is Required")
  .regex(/^[0-9A-HJKMNPQRSTVWXYZ]{26}$/, "Invalid Id");

export const numberSchema = z.coerce
  .number({ error: "Must be a number" })
  .int("Must be an integer")
  .min(1, "Number must be at least 1");

export const isoDateSchema = z
  .string({ error: "Date is required" })
  .refine((val) => !isNaN(Date.parse(val)), { message: "Invalid date format" })
  .transform((val) => new Date(val));

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
