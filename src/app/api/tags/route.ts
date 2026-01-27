import { withApiHandler } from "@lib/http/api-handler";
import { validateBody, validateQuery } from "@lib/http/validate";
import { tagService } from "@lib/tags/tags.service";
import { CUTagSchema, tagQuerySchema } from "@schemas/tags";

export const GET = withApiHandler(async (req) => {
  const dto = validateQuery(req, tagQuerySchema);
  return tagService.findAllTags(dto);
});

export const POST = withApiHandler(async (req) => {
  const dto = await validateBody(req, CUTagSchema);
  return tagService.createTag(dto);
});
