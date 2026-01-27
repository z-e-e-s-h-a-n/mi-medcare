import { categoryService } from "@lib/category/category.service";
import { withApiHandler } from "@lib/http/api-handler";
import { validateBody } from "@lib/http/validate";
import { CUCategorySchema } from "@schemas/category";

export const GET = withApiHandler(async (_req, { getParam }) => {
  const id = await getParam("id");
  return categoryService.findCategory(id);
});

export const PUT = withApiHandler(async (req, { getParam }) => {
  const id = await getParam("id");
  const dto = await validateBody(req, CUCategorySchema);
  return categoryService.updateCategory(id, dto);
});

export const DELETE = withApiHandler(async (_req, { getParam }) => {
  const id = await getParam("id");
  return categoryService.deleteCategory(id);
});
