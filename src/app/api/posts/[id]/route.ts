import { postService } from "@lib/post/post.service";
import { withApiHandler } from "@lib/http/api-handler";
import { validateBody } from "@lib/http/validate";
import { CUPostSchema } from "@schemas/post";
export const GET = withApiHandler(async (req, { getParam }) => {
  const id = await getParam("id");

  return postService.findPost(id, req);
});

export const PUT = withApiHandler(async (req, { getParam }) => {
  const id = await getParam("id");

  const dto = await validateBody(req, CUPostSchema);
  return postService.updatePost(id, dto);
});

export const DELETE = withApiHandler(async (_req, { getParam }) => {
  const id = await getParam("id");
  return postService.deletePost(id);
});
