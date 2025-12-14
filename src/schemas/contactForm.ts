import { z } from "zod";

export const formSchema = z.object({
  firstName: z
    .string({ error: "First name is required" })
    .trim()
    .min(3, { error: "First name must be at least 3 characters" })
    .max(50, { error: "First name is too long" })
    .transform((val) => val.replace(/\s+/g, " ")),

  lastName: z
    .string({ error: "Last name is required" })
    .trim()
    .min(3, { error: "Last name must be at least 3 characters" })
    .max(50, { error: "Last name is too long" })
    .transform((val) => val.replace(/\s+/g, " ")),

  email: z
    .string({ error: "Email is required" })
    .trim()
    .email({ error: "Please enter a valid email address" })
    .transform((val) => val.toLowerCase()),

  phone: z
    .string({ error: "Phone number is required" })
    .trim()
    .refine((val) => /^\+\d{1,3}/.test(val), {
      message: "Country code is required",
    })
    .refine((val) => /^\+\d{1,3}[\d\s\-()]{6,14}$/.test(val), {
      message: "Please enter a valid phone number",
    })
    .transform((val) => val.replace(/\s+/g, "")),

  message: z
    .string({ error: "Message is required" })
    .trim()
    .min(10, { error: "Message must be at least 10 characters" })
    .max(2000, { error: "Message is too long" }),

  timeZone: z.string().optional(),
});

export type FormType = z.infer<typeof formSchema>;
