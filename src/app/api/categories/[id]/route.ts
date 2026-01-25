import { categoryService } from "@lib/category/category.service";
import { withApiHandler } from "@lib/http/api-handler";
import { validateBody } from "@lib/http/validate";
import { CUCategorySchema } from "@schemas/category";

export const GET = withApiHandler(async (_req, ctx) => {
  const id = ctx?.params?.id as string;
  return categoryService.findCategoryById(id);
});

export const PUT = withApiHandler(async (req, ctx) => {
  const id = ctx?.params?.id as string;
  const dto = await validateBody(req, CUCategorySchema);
  return categoryService.updateCategory(id, dto);
});

export const DELETE = withApiHandler(async (_req, ctx) => {
  const id = ctx?.params?.id as string;
  return categoryService.deleteCategory(id);
});
