import * as category from "@lib/category/client";
import { createCrudHooks } from "@/hooks/crud";

export const {
  useEntity: useCategory,
  useEntities: useCategories,
  useRemoveEntity: useRemoveCategory,
  useRestoreEntity: useRestoreCategory,
  useCreateEntity: useCreateCategory,
  useUpdateEntity: useUpdateCategory,
} = createCrudHooks(
  {
    findOne: category.findOneCategory,
    findAll: category.findAllCategories,
    create: category.createCategory,
    update: category.updateCategory,
    remove: category.removeCategory,
    restore: category.restoreCategory,
  },
  {
    single: "category",
    list: "categories",
  },
);
