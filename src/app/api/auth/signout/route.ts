import { authService } from "@lib/auth/auth.service";
import { withApiHandler } from "@lib/http/api-handler";

export const POST = withApiHandler(async () => {
  return authService.signOut();
});
