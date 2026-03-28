"use client";

import { Calendar, Eye, FileText, Tag, User } from "lucide-react";

import type { PostResponse } from "@workspace/contracts/content";
import { GenericDetailsPage } from "@workspace/ui/shared/GenericDetailsPage";
import { usePost } from "@/hooks/content";
import type { AppPageProps } from "@workspace/contracts";
import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@workspace/ui/components/card";
import Image from "next/image";
import { Badge } from "@workspace/ui/components/badge";

const PostDetailsPage = ({ params }: AppPageProps) => {
  const { id } = React.use(params);

  return (
    <GenericDetailsPage<PostResponse>
      entityId={id}
      entityName="Post"
      useQuery={usePost}
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
              accessor: "viewsCount",
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
            { header: "Name", accessor: (d) => d.name },
            { header: "Slug", accessor: (d) => d.slug },
          ],
        },
      ]}
      renderHeader={(data) => (
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold">{data.title}</h2>
            {data.excerpt && (
              <p className="text-muted-foreground mt-2">{data.excerpt}</p>
            )}
            <div className="flex items-center gap-2 mt-3">
              <Badge variant="outline">{data.status}</Badge>
              <span className="text-sm text-muted-foreground">
                {data.viewsCount.toLocaleString()} views
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
        </div>
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
