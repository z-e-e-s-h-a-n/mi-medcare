import { mediaService } from "@lib/media/media.service";
import { withApiHandler } from "@lib/http/api-handler";
import { validateBody } from "@lib/http/validate";
import { MediaUpdateSchema } from "@schemas/media";

export const GET = withApiHandler(async (_req, ctx) => {
  const id = ctx?.params?.id as string;
  return mediaService.findMediaById(id);
});

export const PUT = withApiHandler(async (req, ctx) => {
  const id = ctx?.params?.id as string;
  const dto = await validateBody(req, MediaUpdateSchema);
  return mediaService.updateMedia(id, dto, req);
});

export const DELETE = withApiHandler(async (_req, ctx) => {
  const id = ctx?.params?.id as string;
  return mediaService.deleteMedia(id);
});
