import { adminService } from "@lib/admin/admin.service";
import { withApiHandler } from "@lib/http/api-handler";
import { validateBody, validateQuery } from "@lib/http/validate";
import { CUUserSchema, userQuerySchema } from "@schemas/admin";

export const GET = withApiHandler(async (req) => {
  const dto = validateQuery(req, userQuerySchema);
  return adminService.findAllUsers(dto);
});

export const POST = withApiHandler(async (req) => {
  const dto = await validateBody(req, CUUserSchema);
  return adminService.createUser(dto);
});
