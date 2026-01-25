import { mediaService } from "@lib/media/media.service";
import { withApiHandler } from "@lib/http/api-handler";
import { validateQuery } from "@lib/http/validate";
import { mediaQuerySchema } from "@schemas/media";

export const GET = withApiHandler(async (req) => {
  const dto = validateQuery(req, mediaQuerySchema);
  return mediaService.findAllMedia(dto);
});

export const POST = withApiHandler(async (req) => {
  return mediaService.createMedia(req);
});
