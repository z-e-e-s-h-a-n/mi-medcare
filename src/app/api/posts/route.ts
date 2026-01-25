import { postService } from "@lib/post/post.service";
import { withApiHandler } from "@lib/http/api-handler";
import { validateBody, validateQuery } from "@lib/http/validate";
import { CUPostSchema, postQuerySchema } from "@schemas/post";

export const GET = withApiHandler(async (req) => {
  const dto = validateQuery(req, postQuerySchema);
  return postService.findAllPosts(dto);
});

export const POST = withApiHandler(async (req) => {
  const dto = await validateBody(req, CUPostSchema);
  return postService.createPost(dto, req);
});
