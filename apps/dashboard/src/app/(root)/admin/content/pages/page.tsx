"use client";

import { Badge } from "@workspace/ui/components/badge";
import type {
  PageQueryType,
  PageResponse,
} from "@workspace/contracts/content";

import { useDeletePage, usePages } from "@/hooks/content";
import ListPage from "@/components/shared/ListPage";
import DateWrapper from "@/components/shared/DateWrapper";
import type { ColumnConfig } from "@/components/shared/GenericTable";
import type { SearchByOption } from "@/components/shared/SearchToolbar";

const pageColumns: ColumnConfig<PageResponse, PageQueryType>[] = [
  {
    header: "Title",
    accessor: "title",
    sortKey: "title",
  },
  {
    header: "Slug",
    accessor: "slug",
    sortKey: "slug",
  },
  {
    header: "Status",
    accessor: (page) => <Badge variant="secondary">{page.status}</Badge>,
  },
  {
    header: "Views",
    accessor: "viewsCount",
    sortKey: "viewsCount",
  },
  {
    header: "Published",
    accessor: (page) =>
      page.publishedAt ? <DateWrapper date={page.publishedAt} /> : "—",
    sortKey: "publishedAt",
  },
  {
    header: "Created",
    accessor: (page) => <DateWrapper date={page.createdAt} />,
    sortKey: "createdAt",
  },
];

const pageSearchOptions: SearchByOption<PageQueryType>[] = [
  { value: "title", label: "Title" },
  { value: "slug", label: "Slug" },
  { value: "id", label: "Id" },
];

const PagesPage = () => {
  return (
    <ListPage
      entityKey="pages"
      columns={pageColumns}
      searchByOptions={pageSearchOptions}
      useListHook={usePages}
      useDeleteHook={useDeletePage}
      defaultSortBy="createdAt"
      defaultSearchBy="title"
    />
  );
};

export default PagesPage;
