import { FileText } from "lucide-react";

import type { PageResponse } from "@workspace/contracts/content";
import { GenericDetailsPage } from "@/components/shared/GenericDetailsPage";
import { usePage } from "@/hooks/content";

type PageDetailsPageProps = {
  params: Promise<{ id: string }>;
};

const PageDetailsPage = async ({ params }: PageDetailsPageProps) => {
  const { id } = await params;

  return (
    <GenericDetailsPage<PageResponse, never>
      entityId={id}
      entityName="page"
      useQuery={usePage}
      renderHeader={(page) => (
        <div className="flex items-start gap-4">
          <div className="rounded-xl bg-background/80 p-3">
            <FileText className="size-6" />
          </div>
          <div>
            <h2 className="text-2xl font-bold">{page.title}</h2>
            <p className="text-muted-foreground">{page.slug}</p>
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
            { label: "Status", accessor: "status" },
            { label: "Views", accessor: "viewsCount" },
            {
              label: "Published At",
              accessor: (page) => page.publishedAt ?? "—",
            },
            {
              label: "Content",
              accessor: (page) => page.content || "—",
              className: "md:col-span-2",
            },
          ],
        },
      ]}
    />
  );
};

export default PageDetailsPage;
