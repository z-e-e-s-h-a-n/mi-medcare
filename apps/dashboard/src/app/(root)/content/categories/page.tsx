"use client";

import type {
  CategoryQueryType,
  CategoryResponse,
} from "@workspace/contracts/content";

import { useCategories, useDeleteCategory } from "@/hooks/content";
import ListPage from "@workspace/ui/shared/ListPage";
import type { ColumnConfig } from "@workspace/ui/shared/GenericTable";
import type { SearchByOption } from "@workspace/ui/shared/SearchToolbar";
import { formatDate } from "@workspace/shared/utils";

const categoryColumns: ColumnConfig<CategoryResponse, CategoryQueryType>[] = [
  {
    header: "Name",
    accessor: (c) => (
      <div className="space-y-1">
        <div className="font-medium">{c.name}</div>
        <div className="text-xs text-muted-foreground">/{c.slug}</div>
      </div>
    ),
    sortKey: "name",
  },
  {
    header: "Parent",
    accessor: (category) => category.parent?.name ?? "—",
  },
  {
    header: "Children",
    accessor: (category) => category.children?.length ?? 0,
  },
  {
    header: "Posts",
    accessor: (c) => c._count.posts,
  },
  {
    header: "Updated",
    accessor: (category) => formatDate(category.updatedAt),
    sortKey: "updatedAt",
  },
  {
    header: "Created",
    accessor: (category) => formatDate(category.createdAt),
    sortKey: "createdAt",
  },
];

const categorySearchOptions: SearchByOption<CategoryQueryType>[] = [
  { value: "name", label: "Name" },
  { value: "slug", label: "Slug" },
  { value: "id", label: "Id" },
];

const CategoriesPage = () => {
  return (
    <ListPage
      dataKey="categories"
      columns={categoryColumns}
      searchByOptions={categorySearchOptions}
      useListHook={useCategories}
      useDeleteHook={useDeleteCategory}
      defaultSortBy="createdAt"
      defaultSearchBy="name"
    />
  );
};

export default CategoriesPage;
