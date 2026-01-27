import z from "zod";
import { baseQuerySchema } from "./shared";
import { MediaSearchByEnum, MediaSortByEnum } from "./enums";

export const MediaUpdateSchema = z.object({
  filename: z.string().min(1, "Filename is required"),
});

export const mediaQuerySchema = baseQuerySchema(
  MediaSortByEnum,
  MediaSearchByEnum,
).extend({
  mimeType: z.string().optional(),
});
