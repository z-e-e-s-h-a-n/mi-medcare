"use client";

import { Calendar, Hash, LinkIcon, Tags } from "lucide-react";

import type { TagResponse } from "@workspace/contracts/content";
import { GenericDetailsPage } from "@workspace/ui/shared/GenericDetailsPage";
import { useTag } from "@/hooks/content";
import type { AppPageProps } from "@workspace/contracts";
import React from "react";
import { Badge } from "@workspace/ui/components/badge";

const TagDetailsPage = ({ params }: AppPageProps) => {
  const { id } = React.use(params);

  return (
    <GenericDetailsPage<TagResponse>
      entityId={id}
      entityName="tag"
      useQuery={useTag}
      sections={[
        {
          title: "Basic Information",
          columns: 2,
          fields: [
            {
              label: "Name",
              accessor: "name",
              icon: Tags,
            },
            {
              label: "Slug",
              accessor: "slug",
              icon: Hash,
              render: (value) => (
                <span className="font-mono text-sm">/{value}</span>
              ),
            },
          ],
        },
        {
          title: "Timeline",
          columns: 2,
          fields: [
            {
              label: "Created At",
              accessor: "createdAt",
              icon: Calendar,
              format: (value) => new Date(value).toLocaleDateString(),
            },
            {
              label: "Updated At",
              accessor: "updatedAt",
              icon: Calendar,
              format: (value) => new Date(value).toLocaleDateString(),
            },
          ],
        },
      ]}
      renderHeader={(tag) => (
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-start gap-4">
            <div className="rounded-xl bg-background/80 p-3">
              <Tags className="size-6" />
            </div>
            <div>
              <div className="mb-2 flex items-center gap-3">
                <h2 className="text-2xl font-bold">{tag.name}</h2>
                <Badge variant="secondary" className="gap-1">
                  <Tags className="h-3 w-3" />
                  Tag
                </Badge>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <LinkIcon className="h-4 w-4" />
                <span className="font-mono text-sm">/{tag.slug}</span>
              </div>
            </div>
          </div>
          <div className="text-right">
            <div className="text-sm text-muted-foreground">Tag ID</div>
            <div className="font-mono text-xs text-muted-foreground">
              {tag.id}
            </div>
          </div>
        </div>
      )}
    />
  );
};

export default TagDetailsPage;
