"use client";

import { Tags } from "lucide-react";

import type { TagResponse } from "@workspace/contracts/content";
import { GenericDetailsPage } from "@/components/shared/GenericDetailsPage";
import { useTag } from "@/hooks/content";

type TagDetailsPageProps = {
  params: Promise<{ id: string }>;
};

const TagDetailsPage = async ({ params }: TagDetailsPageProps) => {
  const { id } = await params;

  return (
    <GenericDetailsPage<TagResponse, never>
      entityId={id}
      entityName="tag"
      useQuery={useTag}
      renderHeader={(tag) => (
        <div className="flex items-start gap-4">
          <div className="rounded-xl bg-background/80 p-3">
            <Tags className="size-6" />
          </div>
          <div>
            <h2 className="text-2xl font-bold">{tag.name}</h2>
            <p className="text-muted-foreground">{tag.slug}</p>
          </div>
        </div>
      )}
      sections={[
        {
          title: "Overview",
          columns: 2,
          fields: [
            { label: "Name", accessor: "name" },
            { label: "Slug", accessor: "slug" },
            { label: "Created At", accessor: "createdAt" },
            { label: "Updated At", accessor: "updatedAt" },
          ],
        },
      ]}
    />
  );
};

export default TagDetailsPage;
