"use client";

import { Badge } from "@workspace/ui/components/badge";
import type {
  ConsultationRequestQueryType,
  ConsultationRequestResponse,
} from "@workspace/contracts/consultation";
import { ConsultationRequestStatusEnum } from "@workspace/contracts";

import { useConsultationRequests } from "@/hooks/lead";
import ListPage from "@workspace/ui/shared/ListPage";
import type { ColumnConfig } from "@workspace/ui/shared/GenericTable";
import type { SearchByOption } from "@workspace/ui/shared/SearchToolbar";
import { formatDate } from "@workspace/shared/utils";

const consultationColumns: ColumnConfig<
  ConsultationRequestResponse,
  ConsultationRequestQueryType
>[] = [
  {
    header: "Name",
    accessor: "fullName",
    sortKey: "fullName",
  },
  {
    header: "Practice",
    accessor: "practiceName",
    sortKey: "practiceName",
  },
  {
    header: "Email",
    accessor: "email",
    sortKey: "email",
  },
  {
    header: "Status",
    accessor: (request) => <Badge variant="secondary">{request.status}</Badge>,
  },
  {
    header: "Received",
    accessor: (request) => formatDate(request.createdAt),
    sortKey: "createdAt",
  },
];

const consultationSearchOptions: SearchByOption<ConsultationRequestQueryType>[] =
  [
    { value: "name", label: "Name" },
    { value: "practiceName", label: "Practice Name" },
    { value: "email", label: "Email" },
    { value: "phone", label: "Phone" },
  ];

const ConsultationRequestsPage = () => {
  return (
    <ListPage
      dataKey="requests"
      canAdd={false}
      columns={consultationColumns}
      searchByOptions={consultationSearchOptions}
      useListHook={useConsultationRequests}
      defaultSortBy="createdAt"
      defaultSearchBy="name"
      filterConfig={{
        key: "status",
        label: "Status",
        options: ConsultationRequestStatusEnum.options,
      }}
    />
  );
};

export default ConsultationRequestsPage;
