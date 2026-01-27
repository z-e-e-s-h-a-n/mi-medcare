import { withApiHandler } from "@lib/http/api-handler";
import { validateBody } from "@lib/http/validate";
import { tagService } from "@lib/tags/tags.service";
import { CUTagSchema } from "@schemas/tags";

export const GET = withApiHandler(async (_req, { getParam }) => {
  const id = await getParam("id");
  return tagService.findTag(id);
});

export const PUT = withApiHandler(async (req, { getParam }) => {
  const id = await getParam("id");
  const dto = await validateBody(req, CUTagSchema);
  return tagService.updateTag(id, dto);
});

export const DELETE = withApiHandler(async (_req, { getParam }) => {
  const id = await getParam("id");
  return tagService.deleteTag(id);
});
