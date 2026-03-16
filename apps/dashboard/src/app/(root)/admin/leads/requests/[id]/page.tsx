"use client";
import { ClipboardList } from "lucide-react";

import type { ConsultationRequestResponse } from "@workspace/contracts/consultation";
import { GenericDetailsPage } from "@/components/shared/GenericDetailsPage";
import { useConsultationRequest } from "@/hooks/lead";
import React from "react";

type ConsultationRequestDetailsPageProps = {
  params: Promise<{ id: string }>;
};

const ConsultationRequestDetailsPage = ({
  params,
}: ConsultationRequestDetailsPageProps) => {
  const { id } = React.use(params);

  return (
    <GenericDetailsPage<ConsultationRequestResponse, never>
      entityId={id}
      entityName="consultation request"
      useQuery={useConsultationRequest}
      renderHeader={(request) => (
        <div className="flex items-start gap-4">
          <div className="rounded-xl bg-background/80 p-3">
            <ClipboardList className="size-6" />
          </div>
          <div>
            <h2 className="text-2xl font-bold">{request.fullName}</h2>
            <p className="text-muted-foreground">{request.practiceName}</p>
          </div>
        </div>
      )}
      sections={[
        {
          title: "Request Details",
          columns: 2,
          fields: [
            { label: "Name", accessor: "fullName" },
            { label: "Practice", accessor: "practiceName" },
            { label: "Email", accessor: "email" },
            { label: "Phone", accessor: "phone" },
            { label: "Status", accessor: "status" },
            {
              label: "Practice Type",
              accessor: (request) => request.practiceType ?? "—",
            },
            {
              label: "Monthly Claims",
              accessor: (request) => request.monthlyClaims ?? "—",
            },
            {
              label: "Message",
              accessor: (request) => request.message,
              className: "md:col-span-2",
            },
            {
              label: "Notes",
              accessor: (request) => request.notes ?? "—",
              className: "md:col-span-2",
            },
          ],
        },
      ]}
    />
  );
};

export default ConsultationRequestDetailsPage;
