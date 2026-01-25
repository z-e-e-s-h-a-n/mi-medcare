import { tagService } from "@lib/tags/tags.service";
import { withApiHandler } from "@lib/http/api-handler";
import { validateBody } from "@lib/http/validate";
import { CUTagSchema } from "@schemas/tags";

export const GET = withApiHandler(async (_req, ctx) => {
  const id = ctx?.params?.id as string;
  return tagService.findTagById(id);
});

export const PUT = withApiHandler(async (req, ctx) => {
  const id = ctx?.params?.id as string;
  const dto = await validateBody(req, CUTagSchema);
  return tagService.updateTag(id, dto);
});

export const DELETE = withApiHandler(async (_req, ctx) => {
  const id = ctx?.params?.id as string;
  return tagService.deleteTag(id);
});
