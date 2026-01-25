import { authService } from "@lib/auth/auth.service";
import { withApiHandler } from "@lib/http/api-handler";
import { validateBody } from "@lib/http/validate";
import { resetPasswordSchema } from "@schemas/auth";

export const POST = withApiHandler(async (req) => {
  const dto = await validateBody(req, resetPasswordSchema);

  return authService.resetPassword(dto);
});
