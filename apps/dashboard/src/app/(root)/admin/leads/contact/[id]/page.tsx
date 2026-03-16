import { Mail } from "lucide-react";

import type { ContactMessageResponse } from "@workspace/contracts/contact";
import { GenericDetailsPage } from "@/components/shared/GenericDetailsPage";
import { useContactMessage } from "@/hooks/lead";

type ContactMessageDetailsPageProps = {
  params: Promise<{ id: string }>;
};

const ContactMessageDetailsPage = async ({
  params,
}: ContactMessageDetailsPageProps) => {
  const { id } = await params;

  return (
    <GenericDetailsPage<ContactMessageResponse, never>
      entityId={id}
      entityName="contact message"
      useQuery={useContactMessage}
      renderHeader={(message) => (
        <div className="flex items-start gap-4">
          <div className="rounded-xl bg-background/80 p-3">
            <Mail className="size-6" />
          </div>
          <div>
            <h2 className="text-2xl font-bold">{message.fullName}</h2>
            <p className="text-muted-foreground">{message.email}</p>
          </div>
        </div>
      )}
      sections={[
        {
          title: "Message Details",
          columns: 2,
          fields: [
            { label: "Name", accessor: "fullName" },
            { label: "Email", accessor: "email" },
            { label: "Phone", accessor: "phone" },
            { label: "Status", accessor: "status" },
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
          ],
        },
      ]}
    />
  );
};

export default ContactMessageDetailsPage;
