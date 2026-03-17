import { FileText } from "lucide-react";

import type { PostResponse } from "@workspace/contracts/content";
import { GenericDetailsPage } from "@/components/shared/GenericDetailsPage";
import { usePost } from "@/hooks/content";
import type { AppPageProps } from "@workspace/contracts";

const PostDetailsPage = async ({ params }: AppPageProps) => {
  const { id } = await params;

  return (
    <GenericDetailsPage<PostResponse, "tags">
      entityId={id}
      entityName="post"
      useQuery={usePost}
      renderHeader={(post) => (
        <div className="flex items-start gap-4">
          <div className="rounded-xl bg-background/80 p-3">
            <FileText className="size-6" />
          </div>
          <div>
            <h2 className="text-2xl font-bold">{post.title}</h2>
            <p className="text-muted-foreground">{post.slug}</p>
          </div>
        </div>
      )}
      sections={[
        {
          title: "Overview",
          columns: 2,
          fields: [
            { label: "Title", accessor: "title" },
            { label: "Slug", accessor: "slug" },
            {
              label: "Category",
              accessor: (post) => post.category?.name ?? "—",
            },
            {
              label: "Author",
              accessor: (post) => post.author?.displayName ?? "—",
            },
            { label: "Status", accessor: "status" },
            { label: "Views", accessor: "viewsCount" },
            {
              label: "Excerpt",
              accessor: (post) => post.excerpt,
              className: "md:col-span-2",
            },
            {
              label: "Content",
              accessor: (post) => post.content,
              className: "md:col-span-2",
            },
          ],
        },
      ]}
      relatedEntities={[
        {
          title: "Tags",
          dataKey: "tags",
          columns: [
            { header: "Name", accessor: (tag) => tag.name },
            { header: "Slug", accessor: (tag) => tag.slug },
          ],
          viewPath: (tag) => `/admin/content/tags/${tag.id}`,
        },
      ]}
    />
  );
};

export default PostDetailsPage;
