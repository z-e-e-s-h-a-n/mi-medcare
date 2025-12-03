import { z } from "zod";

export const formSchema = z.object({
  firstName: z
    .string({
      error: "First name is required",
    })
    .trim()
    .min(3, { error: "First name must be at least 3 characters" })
    .max(50, { error: "First name is too long" }),

  lastName: z
    .string({
      error: "Last name is required",
    })
    .trim()
    .min(3, { error: "Last name must be at least 3 characters" })
    .max(50, { error: "Last name is too long" }),

  email: z.email({ error: "Please enter a valid email address" }),

  subject: z
    .string({
      error: "Subject is required",
    })
    .trim()
    .min(5, { error: "Subject must be at least 5 characters" })
    .max(150, { error: "Subject is too long" }),

  message: z
    .string({
      error: "Message is required",
    })
    .trim()
    .min(10, { error: "Message must be at least 10 characters" })
    .max(2000, { error: "Message is too long" }),
});

export type FormType = z.infer<typeof formSchema>;
