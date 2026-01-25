"use client";

import type { ColumnConfig } from "@components/dashboard/GenericTable";
import ListPage from "@components/dashboard/ListPage";
import { SearchByOption } from "@components/dashboard/SearchToolbar";
import { Badge } from "@components/ui/badge";
import { useCategories, useRemoveCategory } from "@hooks/category";

export const categoryColumns: ColumnConfig<
  CategoryResponse,
  CategoryQueryType
>[] = [
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
    accessor: (c) =>
      c.parent ? (
        <Badge variant="secondary">{c.parent.name}</Badge>
      ) : (
        <span className="text-muted-foreground">—</span>
      ),
    sortKey: "parent",
  },

  {
    header: "Description",
    accessor: (c) =>
      c.description ? (
        <span className="text-sm line-clamp-2">{c.description}</span>
      ) : (
        <span className="text-muted-foreground">—</span>
      ),
  },

  {
    header: "Posts",
    accessor: (c) => c.posts?.length ?? 0,
    sortKey: "posts",
  },

  {
    header: "Created",
    accessor: (c) => new Date(c.createdAt).toLocaleDateString(),
    sortKey: "createdAt",
  },
];

const CategorySearchByOptions: SearchByOption<CategoryQueryType>[] = [
  { value: "id", label: "Category Id" },
  { value: "name", label: "Name" },
  { value: "slug", label: "Slug" },
];

const page = () => {
  return (
    <ListPage
      entityType="category"
      dataKey="categories"
      columns={categoryColumns}
      searchByOptions={CategorySearchByOptions}
      useListHook={useCategories}
      useDeleteHook={useRemoveCategory}
      defaultSortBy="createdAt"
      defaultSearchBy="name"
    />
  );
};

export default page;
