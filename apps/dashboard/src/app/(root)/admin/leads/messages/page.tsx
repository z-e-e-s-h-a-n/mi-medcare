"use client";

import { Badge } from "@workspace/ui/components/badge";
import type {
  ContactMessageQueryType,
  ContactMessageResponse,
} from "@workspace/contracts/contact";
import { ContactMessageStatusEnum } from "@workspace/contracts";

import { useContactMessages } from "@/hooks/lead";
import ListPage from "@/components/shared/ListPage";
import DateWrapper from "@/components/shared/DateWrapper";
import type { ColumnConfig } from "@/components/shared/GenericTable";
import type { SearchByOption } from "@/components/shared/SearchToolbar";

const contactColumns: ColumnConfig<
  ContactMessageResponse,
  ContactMessageQueryType
>[] = [
  {
    header: "Name",
    accessor: "fullName",
    sortKey: "fullName",
  },
  {
    header: "Email",
    accessor: "email",
    sortKey: "email",
  },
  {
    header: "Phone",
    accessor: "phone",
    sortKey: "phone",
  },
  {
    header: "Status",
    accessor: (message) => <Badge variant="secondary">{message.status}</Badge>,
  },
  {
    header: "Received",
    accessor: (message) => <DateWrapper date={message.createdAt} />,
    sortKey: "createdAt",
  },
];

const contactSearchOptions: SearchByOption<ContactMessageQueryType>[] = [
  { value: "name", label: "Name" },
  { value: "email", label: "Email" },
  { value: "phone", label: "Phone" },
  { value: "practiceName", label: "Practice Name" },
];

const ContactMessagesPage = () => {
  return (
    <ListPage
      dataKey="messages"
      canAdd={false}
      columns={contactColumns}
      searchByOptions={contactSearchOptions}
      useListHook={useContactMessages}
      defaultSortBy="createdAt"
      defaultSearchBy="name"
      filterConfig={{
        key: "status",
        label: "Status",
        options: ContactMessageStatusEnum.options,
      }}
    />
  );
};

export default ContactMessagesPage;
