import { z } from "zod";

/**
 * ==============================
 * PUBLIC ENV (CLIENT SAFE)
 * Must be prefixed with NEXT_PUBLIC_
 * ==============================
 */
export const publicEnvSchema = z.object({
  NEXT_PUBLIC_APP_NAME: z.string(),
  NEXT_PUBLIC_APP_ENDPOINT: z.string(),
  NEXT_PUBLIC_API_ENDPOINT: z.string(),
});


export function validatePublicEnv(env: Record<string, unknown>) {
  const parsed = publicEnvSchema.safeParse(env);

  if (!parsed.success) {
    console.error(
      "❌ Invalid PUBLIC environment variables:",
      z.flattenError(parsed.error).fieldErrors,
    );
    throw new Error("Invalid public environment variables");
  }

  return parsed.data;
}

export type PublicEnv = z.infer<typeof publicEnvSchema>;
