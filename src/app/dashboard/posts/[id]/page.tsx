"use client";
import { GenericDetailsPage } from "@components/dashboard/GenericDetailsPage";
import { Badge } from "@components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@components/ui/card";
import { usePost } from "@hooks/post";
import { Calendar, Eye, FileText, Tag, User } from "lucide-react";
import Image from "next/image";
import React from "react";

const PostDetailsPage = ({ params }: AppPageProps<{ id: string }>) => {
  const { id } = React.use(params);

  return (
    <GenericDetailsPage<PostResponse>
      entityId={id}
      entityName="Post"
      useQuery={usePost}
      editPath={`/dashboard/posts/${id}/edit`}
      backPath="/dashboard/posts"
      sections={[
        {
          title: "Basic Information",
          fields: [
            {
              label: "Title",
              accessor: "title",
              icon: FileText,
            },
            {
              label: "Slug",
              accessor: "slug",
              icon: Tag,
            },
            {
              label: "Status",
              accessor: "status",
              icon: Eye,
              render: (value) => <Badge variant="outline">{value}</Badge>,
            },
            {
              label: "Author",
              accessor: "author",
              icon: User,
              render: (value) => value?.displayName || "—",
            },
          ],
          columns: 2,
        },
        {
          title: "Timeline",
          fields: [
            {
              label: "Created At",
              accessor: "createdAt",
              icon: Calendar,
              format: (value) => new Date(value).toLocaleDateString(),
            },
            {
              label: "Published At",
              accessor: "publishedAt",
              icon: Calendar,
              format: (value) =>
                value ? new Date(value).toLocaleDateString() : "—",
            },
            {
              label: "Views",
              accessor: "views",
              icon: Eye,
            },
          ],
          columns: 3,
        },
        {
          title: "Content",
          fields: [
            {
              label: "Excerpt",
              accessor: "excerpt",
              className: "col-span-full",
            },
            {
              label: "Content",
              accessor: "content",
              className: "col-span-full",
              render: (value) => (
                <div className="prose prose-sm max-w-none">
                  <div dangerouslySetInnerHTML={{ __html: value }} />
                </div>
              ),
            },
          ],
          columns: 1,
        },
      ]}
      relatedEntities={[
        {
          title: "Tags",
          dataKey: "tags",
          columns: [
            { header: "Name", accessor: "name" },
            { header: "Slug", accessor: "slug" },
          ],
        },
      ]}
      renderHeader={(data) => (
        <Card className="bg-linear-to-r from-primary/5 to-primary/10 border-primary/20">
          <CardContent className="flex items-start justify-between pt-6 gap-4">
            <div>
              <h2 className="text-2xl font-bold">{data.title}</h2>
              {data.excerpt && (
                <p className="text-muted-foreground mt-2">{data.excerpt}</p>
              )}
              <div className="flex items-center gap-2 mt-3">
                <Badge variant="outline">{data.status}</Badge>
                <span className="text-sm text-muted-foreground">
                  {data.views.toLocaleString()} views
                </span>
              </div>
            </div>
            {data.cover && (
              <Image
                src={data.cover.url}
                alt={data.title}
                width={400}
                height={400}
                className="w-32 h-32 object-cover rounded-lg"
              />
            )}
          </CardContent>
        </Card>
      )}
    >
      {(data) => (
        <Card>
          <CardHeader>
            <CardTitle>SEO Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <div className="text-sm text-muted-foreground">Meta Title</div>
                <div className="text-sm font-medium">
                  {data.metaTitle || "—"}
                </div>
              </div>
              <div className="space-y-2">
                <div className="text-sm text-muted-foreground">
                  Meta Description
                </div>
                <div className="text-sm font-medium">
                  {data.metaDescription || "—"}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </GenericDetailsPage>
  );
};

export default PostDetailsPage;
