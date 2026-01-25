import { authService } from "@lib/auth/auth.service";
import { withApiHandler } from "@lib/http/api-handler";
import { validateBody } from "@lib/http/validate";
import { signInSchema } from "@schemas/auth";

export const POST = withApiHandler(async (req) => {
  const dto = await validateBody(req, signInSchema);

  return authService.signIn(dto, req);
});
