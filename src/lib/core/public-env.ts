import { validatePublicEnv } from "@schemas/public.env";

/**
 * PUBLIC ENV
 * Can be imported in client components.
 */

const rawPublicEnv = {
  NEXT_PUBLIC_APP_NAME: process.env.NEXT_PUBLIC_APP_NAME,
  NEXT_PUBLIC_APP_ENDPOINT: process.env.NEXT_PUBLIC_APP_ENDPOINT,
  NEXT_PUBLIC_API_ENDPOINT: process.env.NEXT_PUBLIC_API_ENDPOINT,
} as Record<string, unknown>;

export const publicEnv = validatePublicEnv(rawPublicEnv);
