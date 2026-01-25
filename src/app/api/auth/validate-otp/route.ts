import { authService } from "@lib/auth/auth.service";
import { withApiHandler } from "@lib/http/api-handler";
import { validateQuery } from "@lib/http/validate";
import { validateOtpSchema } from "@schemas/auth";

export const GET = withApiHandler(async (req,) => {
  const dto = validateQuery(req, validateOtpSchema);
  return authService.validateOtp(dto);

});
