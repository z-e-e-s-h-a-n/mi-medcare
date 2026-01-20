import { z } from "zod";

export const contactSource = z.enum([
  "email",
  "website",
  "linkedIn",
  "ad",
  "facebook",
  "instagram",
  "call",
]);

export const formSchema = z.object({
  name: z
    .string({ error: "First name is required" })
    .trim()
    .min(2, "First name must be at least 2 characters")
    .max(50, "First name is too long")
    .transform((val) => val.replace(/\s+/g, " ")),

  email: z.email({ error: "Email is required" }).trim().toLowerCase(),

  phone: z
    .string({ error: "Phone number is required" })
    .trim()
    .transform((val) => val.replace(/[^\d+]/g, ""))
    .refine(
      (val) => val.replace(/\D/g, "").length >= 10,
      "Please enter a valid phone number",
    ),

  source: contactSource.default("website"),

  message: z
    .string({ error: "Message is required" })
    .trim()
    .min(10, "Please provide a brief description of your billing needs")
    .max(2000, "Message is too long")
    .transform((val) => val.replace(/\s+/g, " "))
    .optional(),

  timeZone: z.string().optional(),
});

export type FormType = z.input<typeof formSchema>;
