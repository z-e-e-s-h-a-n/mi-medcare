"use client";

import { Calendar, Mail, MessageSquare, Phone, UserRound } from "lucide-react";

import type { ContactMessageResponse } from "@workspace/contracts/contact";
import { GenericDetailsPage } from "@workspace/ui/shared/GenericDetailsPage";
import { useContactMessage } from "@/hooks/lead";
import React from "react";
import type { AppPageProps } from "@workspace/contracts";
import { Badge } from "@workspace/ui/components/badge";

const ContactMessageDetailsPage = ({ params }: AppPageProps) => {
  const { id } = React.use(params);

  return (
    <GenericDetailsPage<ContactMessageResponse>
      entityId={id}
      entityName="contact message"
      useQuery={useContactMessage}
      renderHeader={(message) => (
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-start gap-4">
            <div className="rounded-xl bg-background/80 p-3">
              <Mail className="size-6" />
            </div>
            <div>
              <div className="mb-2 flex items-center gap-3">
                <h2 className="text-2xl font-bold">{message.fullName}</h2>
                <Badge variant="outline">{message.status}</Badge>
              </div>
              <p className="text-muted-foreground">{message.email}</p>
              {message.practiceName && (
                <p className="mt-1 text-sm text-muted-foreground">
                  {message.practiceName}
                </p>
              )}
            </div>
          </div>
          <div className="text-right text-sm text-muted-foreground">
            <div>Message ID</div>
            <div className="font-mono text-xs">{message.id}</div>
          </div>
        </div>
      )}
      sections={[
        {
          title: "Contact Details",
          columns: 2,
          fields: [
            { label: "Name", accessor: "fullName", icon: UserRound },
            { label: "Email", accessor: "email", icon: Mail },
            { label: "Phone", accessor: "phone", icon: Phone },
            {
              label: "Status",
              accessor: "status",
              icon: MessageSquare,
              render: (value) => <Badge variant="outline">{value}</Badge>,
            },
            {
              label: "Practice Name",
              accessor: (message) => message.practiceName ?? "—",
            },
            {
              label: "Practice Type",
              accessor: (message) => message.practiceType ?? "—",
            },
            {
              label: "Best Contact Time",
              accessor: (message) => message.bestContactTime ?? "—",
            },
          ],
        },
        {
          title: "Message & Follow-up",
          columns: 2,
          fields: [
            {
              label: "Message",
              accessor: (message) => message.message,
              className: "md:col-span-2",
            },
            {
              label: "Notes",
              accessor: (message) => message.notes ?? "—",
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
            {
              label: "Viewed At",
              accessor: (message) =>
                message.viewedAt
                  ? new Date(message.viewedAt).toLocaleDateString()
                  : "—",
              icon: Calendar,
            },
            {
              label: "Replied At",
              accessor: (message) =>
                message.repliedAt
                  ? new Date(message.repliedAt).toLocaleDateString()
                  : "—",
              icon: Calendar,
            },
          ],
        },
      ]}
    />
  );
};

export default ContactMessageDetailsPage;
