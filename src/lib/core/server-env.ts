import { validateServerEnv } from "@schemas/server.env";

/**
 * SERVER ENV
 * SERVER ONLY - Do not import in client components
 */
export const serverEnv = validateServerEnv(process.env);
