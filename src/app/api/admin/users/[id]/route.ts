import { adminService } from "@lib/admin/admin.service";
import { withApiHandler } from "@lib/http/api-handler";
import { validateBody } from "@lib/http/validate";
import { CUUserSchema } from "@schemas/admin";

export const GET = withApiHandler(async (_req, { getParam }) => {
  const id = await getParam("id");
  return adminService.getUserById(id);
});

export const PUT = withApiHandler(async (req, { getParam }) => {
  const id = await getParam("id");
  const dto = await validateBody(req, CUUserSchema);
  return adminService.updateUser(dto, id);
});

export const DELETE = withApiHandler(async (_req, { getParam }) => {
  const id = await getParam("id");
  return adminService.deleteUser(id);
});
