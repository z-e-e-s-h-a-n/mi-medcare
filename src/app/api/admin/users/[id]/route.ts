import { adminService } from "@lib/admin/admin.service";
import { withApiHandler } from "@lib/http/api-handler";

export const GET = withApiHandler(async (_req, { getParam }) => {
  const id = await getParam("id");
  return adminService.getUserById(id);
});

export const PUT = withApiHandler(async (req, { getParam }) => {
  const id = await getParam("id");
  return adminService.updateUser(undefined, id);
});

export const DELETE = withApiHandler(async (_req, { getParam }) => {
  const id = await getParam("id");
  return adminService.deleteUser(id);
});
