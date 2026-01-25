import { authService } from "@lib/auth/auth.service";
import { withApiHandler } from "@lib/http/api-handler";
import { validateBody } from "@lib/http/validate";
import { changeEmailSchema } from "@schemas/auth";

export const POST = withApiHandler(async (req) => {
  const dto = await validateBody(req, changeEmailSchema);

  return authService.changeEmailReq(dto);
});

export const GET = withApiHandler(async (req) => {
  const dto = await validateBody(req, changeEmailSchema);

  return authService.changeEmail(dto);
});
