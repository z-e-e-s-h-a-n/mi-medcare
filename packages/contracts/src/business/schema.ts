import z from "zod";
import { emailSchema, phoneSchema, idSchema } from "../lib/schema";

export const businessProfileSchema = z.object({
  name: z.string().min(1),
  legalName: z.string(),
  description: z.string(),

  faviconId: idSchema,
  logoId: idSchema,
  coverId: idSchema.optional(),

  email: emailSchema,
  phone: phoneSchema,
  website: z.url(),

  tiktok: z.url().optional(),
  facebook: z.url().optional(),
  instagram: z.url().optional(),
  twitter: z.url().optional(),
  linkedin: z.url().optional(),
  youtube: z.url().optional(),

  address: z.string(),
  city: z.string(),
  state: z.string(),
  country: z.string(),
  postalCode: z.string(),

  metaTitle: z.string(),
  metaDescription: z.string(),
});
