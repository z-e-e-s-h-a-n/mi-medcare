"use client";

import { Badge } from "@workspace/ui/components/badge";
import type { PostQueryType, PostResponse } from "@workspace/contracts/content";

import { useDeletePost, usePosts } from "@/hooks/content";
import ListPage from "@workspace/ui/shared/ListPage";
import type { ColumnConfig } from "@workspace/ui/shared/GenericTable";
import type { SearchByOption } from "@workspace/ui/shared/SearchToolbar";
import { formatDate } from "@workspace/shared/utils";

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
    header: "Category",
    accessor: (post) => post.category?.name ?? "—",
  },
  {
    header: "Status",
    accessor: (post) => <Badge variant="secondary">{post.status}</Badge>,
  },
  {
    header: "Views",
    accessor: "viewsCount",
    sortKey: "viewsCount",
  },
  {
    header: "Published",
    accessor: (post) => (post.publishedAt ? formatDate(post.publishedAt) : "—"),
    sortKey: "publishedAt",
  },
];

const postSearchOptions: SearchByOption<PostQueryType>[] = [
  { value: "title", label: "Title" },
  { value: "slug", label: "Slug" },
  { value: "id", label: "Id" },
];

const PostsPage = () => {
  return (
    <ListPage
      dataKey="posts"
      columns={postColumns}
      searchByOptions={postSearchOptions}
      useListHook={usePosts}
      useDeleteHook={useDeletePost}
      defaultSortBy="createdAt"
      defaultSearchBy="title"
    />
  );
};

export default PostsPage;
