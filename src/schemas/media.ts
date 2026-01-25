import z from "zod";
import { baseQuerySchema, } from "./shared";
import { MediaSearchByEnum, MediaSortByEnum } from "./enums";

export const MediaUpdateSchema = z.object({
  url: z.url("Invalid URL"),
  filename: z.string().min(1, "Filename is required"),
  mimeType: z.string().min(1, "MIME type is required"),
  size: z.number().int().min(0, "Size must be a positive integer"),
}).partial();


export const mediaQuerySchema = baseQuerySchema(
  MediaSortByEnum,
  MediaSearchByEnum,
).extend({
  mimeType: z.string().optional(),
});
