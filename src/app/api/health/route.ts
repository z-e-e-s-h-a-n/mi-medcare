import { withApiHandler } from "@lib/http/api-handler";

export const GET = withApiHandler(async () => {
  const uptime = process.uptime();
  const timestamp = new Date().toISOString();

  return {
    message: "Server is healthy",
    uptime,
    timestamp,
  };
});
