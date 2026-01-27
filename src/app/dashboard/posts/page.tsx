"use client";

import type { ColumnConfig } from "@components/dashboard/GenericTable";
import ListPage from "@components/dashboard/ListPage";
import { SearchByOption } from "@components/dashboard/SearchToolbar";
import { Badge } from "@components/ui/badge";
import { usePosts, useRemovePost } from "@hooks/post";
import { PostStatusEnum } from "@schemas/enums";

const postColumns: ColumnConfig<PostResponse, PostQueryType>[] = [
  {
    header: "Title",
    accessor: (p) => (
      <div className="space-y-1">
        <div className="font-medium">{p.title}</div>
        <div className="text-xs text-muted-foreground">/{p.slug}</div>
      </div>
    ),
    sortKey: "title",
  },

  {
    header: "Author",
    accessor: (p) => <div className="text-sm">{p.author.displayName}</div>,
    sortKey: "author",
  },

  {
    header: "Category",
    accessor: (p) =>
      p.category ? (
        <Badge variant="secondary">{p.category.name}</Badge>
      ) : (
        <span className="text-muted-foreground">—</span>
      ),
    sortKey: "category",
  },

  {
    header: "Status",
    accessor: (p) => <Badge variant="outline">{p.status}</Badge>,
    sortKey: "status",
  },

  {
    header: "Published",
    accessor: (p) =>
      p.publishedAt ? new Date(p.publishedAt).toLocaleDateString() : "—",
    sortKey: "publishedAt",
  },

  {
    header: "Views",
    accessor: (p) => p.views.toLocaleString(),
    sortKey: "views",
  },

  {
    header: "Created",
    accessor: (p) => new Date(p.createdAt).toLocaleDateString(),
    sortKey: "createdAt",
  },
];

const postSearchByOptions: SearchByOption<PostQueryType>[] = [
  { value: "id", label: "Post Id" },
  { value: "title", label: "Title" },
  { value: "slug", label: "Slug" },
  { value: "author", label: "Author" },
  { value: "category", label: "Category" },
];

const Page = () => {
  return (
    <ListPage
      dataKey="posts"
      entityType="dashboard/posts"
      columns={postColumns}
      searchByOptions={postSearchByOptions}
      useListHook={usePosts}
      useDeleteHook={useRemovePost}
      defaultSortBy="publishedAt"
      defaultSearchBy="title"
      filterConfig={{
        key: "status",
        label: "Status",
        options: PostStatusEnum.options,
      }}
    />
  );
};

export default Page;
