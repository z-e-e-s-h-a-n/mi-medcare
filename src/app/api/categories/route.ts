import { categoryService } from "@lib/category/category.service";
import { withApiHandler } from "@lib/http/api-handler";
import { validateBody, validateQuery } from "@lib/http/validate";
import { CUCategorySchema, categoryQuerySchema } from "@schemas/category";

export const GET = withApiHandler(async (req) => {
  const dto = validateQuery(req, categoryQuerySchema);
  return categoryService.findAllCategories(dto);
});

export const POST = withApiHandler(async (req) => {
  const dto = await validateBody(req, CUCategorySchema);
  return categoryService.createCategory(dto);
});
