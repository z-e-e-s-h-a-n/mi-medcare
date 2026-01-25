import { z } from "zod";
import ms, { type StringValue } from "ms";

/**
 * ms() duration validator
 * e.g. "15m", "7d"
 */
const zMsString = z
  .string()
  .transform((val) => val as StringValue)
  .refine((val) => {
    try {
      const parsed = ms(val);
      return typeof parsed === "number" && parsed > 0;
    } catch {
      return false;
    }
  }, "Invalid ms() duration string");

/**
 * ==============================
 * SERVER ENV (PRIVATE)
 * ==============================
 */
export const serverEnvSchema = z.object({
  // ==============================
  // Node
  // ==============================
  NODE_ENV: z
    .enum(["development", "production", "test"])
    .default("development"),

  // ==============================
  // Database
  // ==============================
  DB_URI: z.string(),

  CLOUDINARY_CLOUD_NAME: z.string(),
  CLOUDINARY_API_KEY: z.string(),
  CLOUDINARY_API_SECRET: z.string(),

  // ==============================
  // OTP
  // ==============================
  OTP_EXP: zMsString,

  // ==============================
  // Auth
  // ==============================
  JWT_ACCESS_SECRET: z.string(),
  JWT_REFRESH_SECRET: z.string(),
  ACCESS_TOKEN_EXP: zMsString,
  REFRESH_TOKEN_EXP: zMsString,

  // ==============================
  // OAuth (Google)
  // ==============================
  GOOGLE_CLIENT_ID: z.string(),
  GOOGLE_CLIENT_SECRET: z.string(),
  GOOGLE_CALLBACK_URL: z.string(),

  // ==============================
  // Email (Nodemailer)
  // ==============================
  SMTP_HOST: z.string(),
  SMTP_PORT: z.coerce.number(),
  SMTP_USER: z.string(),
  SMTP_PASS: z.string(),

  // ==============================
  // API Keys
  // ==============================
  IP_STACK_API_KEY: z.string(),

  // ==============================
  // Admin
  // ==============================
  ADMIN_NAME: z.string(),
  ADMIN_EMAIL: z.string(),
  ADMIN_PASSWORD: z.string(),

  // ==============================
  // Google Service Account
  // ==============================
  GOOGLE_CLIENT_EMAIL: z.string(),
  GOOGLE_PRIVATE_KEY: z.string().transform((key) => key.replace(/\\n/g, "\n")),
  GOOGLE_SHEET_ID: z.string(),

  // ==============================
  // GoHighLevel (GHL)
  // ==============================
  GHL_API_TOKEN: z.string(),
  GHL_LOCATION_ID: z.string(),
});

/**
 * Validation helper
 */
export function validateServerEnv(env: Record<string, unknown>) {
  const parsed = serverEnvSchema.safeParse(env);

  if (!parsed.success) {
    console.error(
      "❌ Invalid SERVER environment variables:",
      z.flattenError(parsed.error).fieldErrors,
    );
    throw new Error("Invalid server environment variables");
  }

  return parsed.data;
}

export type ServerEnv = z.infer<typeof serverEnvSchema>;
