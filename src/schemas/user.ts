import z from "zod";
import { nameSchema } from "./auth";

export const userProfileSchema = z.object({
  firstName: nameSchema,
  lastName: nameSchema.optional(),
  displayName: nameSchema,
  imageId: z.string().optional(),
  theme: z.enum(["light", "dark", "system"]).default("system"),
  emailNotifications: z.boolean().optional(),
  pushNotifications: z.boolean().optional(),
});
