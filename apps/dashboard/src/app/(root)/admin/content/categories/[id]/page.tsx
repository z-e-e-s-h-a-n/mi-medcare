"use client";

import { FolderTree } from "lucide-react";

import type { CategoryResponse } from "@workspace/contracts/content";
import { GenericDetailsPage } from "@/components/shared/GenericDetailsPage";
import { useCategory } from "@/hooks/content";
import type { AppPageProps } from "@workspace/contracts";
import React from "react";

const CategoryDetailsPage = ({ params }: AppPageProps) => {
  const { id } = React.use(params);

  return (
    <GenericDetailsPage<CategoryResponse, "children">
      entityId={id}
      entityName="category"
      useQuery={useCategory}
      renderHeader={(category) => (
        <div className="flex items-start gap-4">
          <div className="rounded-xl bg-background/80 p-3">
            <FolderTree className="size-6" />
          </div>
          <div>
            <h2 className="text-2xl font-bold">{category.name}</h2>
            <p className="text-muted-foreground">{category.slug}</p>
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
            {
              label: "Parent Category",
              accessor: (category) => category.parent?.name ?? "—",
            },
            {
              label: "Description",
              accessor: (category) => category.description ?? "—",
            },
          ],
        },
      ]}
      relatedEntities={[
        {
          title: "Child Categories",
          dataKey: "children",
          columns: [
            { header: "Name", accessor: (child) => child.name },
            { header: "Slug", accessor: (child) => child.slug },
          ],
          viewPath: (child) => `/admin/content/categories/${child.id}`,
        },
      ]}
    />
  );
};

export default CategoryDetailsPage;
