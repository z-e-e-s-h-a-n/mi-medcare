import { withApiHandler } from "@lib/http/api-handler";
import { validateBody } from "@lib/http/validate";
import { userService } from "@lib/user/user.service";
import { userProfileSchema } from "@schemas/user";

export const GET = withApiHandler(async (req) => {
  return userService.getCurrentUser(req);
});

export const POST = withApiHandler(async (req) => {
  const dto = await validateBody(req, userProfileSchema);
  return userService.updateUserProfile(dto, req);
});
