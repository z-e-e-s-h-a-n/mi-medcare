import { authService } from "@lib/auth/auth.service";
import { withApiHandler } from "@lib/http/api-handler";
import { validateBody } from "@lib/http/validate";
import { requestOtpSchema } from "@schemas/auth";

export const POST = withApiHandler(async (req) => {
  const dto = await validateBody(req, requestOtpSchema);

  return authService.requestOtp(dto);
});
