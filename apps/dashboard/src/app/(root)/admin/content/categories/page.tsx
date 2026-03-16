"use client";

import type {
  CategoryQueryType,
  CategoryResponse,
} from "@workspace/contracts/content";

import { useCategories, useDeleteCategory } from "@/hooks/content";
import ListPage from "@/components/shared/ListPage";
import DateWrapper from "@/components/shared/DateWrapper";
import type { ColumnConfig } from "@/components/shared/GenericTable";
import type { SearchByOption } from "@/components/shared/SearchToolbar";

const categoryColumns: ColumnConfig<CategoryResponse, CategoryQueryType>[] = [
  {
    header: "Name",
    accessor: "name",
    sortKey: "name",
  },
  {
    header: "Slug",
    accessor: "slug",
    sortKey: "slug",
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
    header: "Updated",
    accessor: (category) => <DateWrapper date={category.updatedAt} />,
    sortKey: "updatedAt",
  },
  {
    header: "Created",
    accessor: (category) => <DateWrapper date={category.createdAt} />,
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
