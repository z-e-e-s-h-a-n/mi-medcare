"use client";

import type { ColumnConfig } from "@components/dashboard/GenericTable";
import useAdmin from "@/hooks/admin";
import ListPage from "@components/dashboard/ListPage";
import { SearchByOption } from "@components/dashboard/SearchToolbar";
import { Badge } from "@components/ui/badge";
import { UserRoleEnum } from "@schemas/enums";

const userColumns: ColumnConfig<UserResponse, UserQueryType>[] = [
  {
    header: "Name",
    accessor: (u) => (
      <div className="font-medium max-w-30 truncate" title={u.displayName}>
        {u.displayName}
      </div>
    ),
    sortKey: "displayName",
  },
  {
    header: "Role",
    accessor: (u) => <Badge variant="outline">{u.role}</Badge>,
  },
  {
    header: "Email",
    accessor: "email",
    sortKey: "email",
  },
  {
    header: "Last Login",
    accessor: (user) => new Date(user.lastLoginAt!).toLocaleDateString(),
    sortKey: "lastLoginAt",
  },
  {
    header: "Created",
    accessor: (user) => new Date(user.createdAt!).toLocaleDateString(),
    sortKey: "createdAt",
  },
];

const userSearchByOptions: SearchByOption<UserQueryType>[] = [
  { value: "id", label: "userId" },
  { value: "displayName", label: "Name" },
  { value: "email", label: "Email" },
];

const page = () => {
  return (
    <ListPage
      entityType="users"
      dataKey="users"
      columns={userColumns}
      searchByOptions={userSearchByOptions}
      useListHook={useAdmin}
      defaultSortBy="createdAt"
      defaultSearchBy="displayName"
      filterConfig={{
        key: "role",
        label: "Roles",
        options: UserRoleEnum.options,
      }}
    />
  );
};

export default page;
