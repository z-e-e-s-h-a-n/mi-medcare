"use client";
import { Calendar, ClipboardList, Mail, Phone, UserRound } from "lucide-react";

import type { ConsultationRequestResponse } from "@workspace/contracts/consultation";
import { GenericDetailsPage } from "@/components/shared/GenericDetailsPage";
import { useConsultationRequest } from "@/hooks/lead";
import React from "react";
import type { AppPageProps } from "@workspace/contracts";
import { Badge } from "@workspace/ui/components/badge";

const ConsultationRequestDetailsPage = ({ params }: AppPageProps) => {
  const { id } = React.use(params);

  return (
    <GenericDetailsPage<ConsultationRequestResponse>
      entityId={id}
      entityName="consultation request"
      useQuery={useConsultationRequest}
      renderHeader={(request) => (
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-start gap-4">
            <div className="rounded-xl bg-background/80 p-3">
              <ClipboardList className="size-6" />
            </div>
            <div>
              <div className="mb-2 flex items-center gap-3">
                <h2 className="text-2xl font-bold">{request.fullName}</h2>
                <Badge variant="outline">{request.status}</Badge>
              </div>
              <p className="text-muted-foreground">{request.practiceName}</p>
              <p className="mt-1 text-sm text-muted-foreground">
                {request.email}
              </p>
            </div>
          </div>
          <div className="text-right text-sm text-muted-foreground">
            <div>Request ID</div>
            <div className="font-mono text-xs">{request.id}</div>
          </div>
        </div>
      )}
      sections={[
        {
          title: "Contact Details",
          columns: 2,
          fields: [
            { label: "Name", accessor: "fullName", icon: UserRound },
            {
              label: "Practice",
              accessor: "practiceName",
              icon: ClipboardList,
            },
            { label: "Email", accessor: "email", icon: Mail },
            { label: "Phone", accessor: "phone", icon: Phone },
            {
              label: "Status",
              accessor: "status",
              icon: ClipboardList,
              render: (value) => <Badge variant="outline">{value}</Badge>,
            },
            {
              label: "Practice Type",
              accessor: (request) => request.practiceType ?? "—",
            },
            {
              label: "Monthly Claims",
              accessor: (request) => request.monthlyClaims ?? "—",
            },
          ],
        },
        {
          title: "Request & Timeline",
          columns: 2,
          fields: [
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
    />
  );
};

export default ConsultationRequestDetailsPage;
