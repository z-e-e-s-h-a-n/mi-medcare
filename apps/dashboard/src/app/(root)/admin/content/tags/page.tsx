"use client";

import type { TagQueryType, TagResponse } from "@workspace/contracts/content";

import { useDeleteTag, useTags } from "@/hooks/content";
import ListPage from "@/components/shared/ListPage";
import DateWrapper from "@/components/shared/DateWrapper";
import type { ColumnConfig } from "@/components/shared/GenericTable";
import type { SearchByOption } from "@/components/shared/SearchToolbar";

const tagColumns: ColumnConfig<TagResponse, TagQueryType>[] = [
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
    header: "Updated",
    accessor: (tag) => <DateWrapper date={tag.updatedAt} />,
    sortKey: "updatedAt",
  },
  {
    header: "Created",
    accessor: (tag) => <DateWrapper date={tag.createdAt} />,
    sortKey: "createdAt",
  },
];

const tagSearchOptions: SearchByOption<TagQueryType>[] = [
  { value: "name", label: "Name" },
  { value: "slug", label: "Slug" },
  { value: "id", label: "Id" },
];

const TagsPage = () => {
  return (
    <ListPage
      dataKey="tags"
      columns={tagColumns}
      searchByOptions={tagSearchOptions}
      useListHook={useTags}
      useDeleteHook={useDeleteTag}
      defaultSortBy="createdAt"
      defaultSearchBy="name"
    />
  );
};

export default TagsPage;
