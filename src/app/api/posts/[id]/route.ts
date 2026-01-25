import { postService } from "@lib/post/post.service";
import { withApiHandler } from "@lib/http/api-handler";
import { validateBody } from "@lib/http/validate";
import { CUPostSchema } from "@schemas/post";

export const GET = withApiHandler(async (_req, ctx) => {
  const id = ctx?.params?.id as string;
  return postService.findPostById(id);
});

export const PUT = withApiHandler(async (req, ctx) => {
  const id = ctx?.params?.id as string;
  const dto = await validateBody(req, CUPostSchema);
  return postService.updatePost(id, dto);
});

export const DELETE = withApiHandler(async (_req, ctx) => {
  const id = ctx?.params?.id as string;
  return postService.deletePost(id);
});
