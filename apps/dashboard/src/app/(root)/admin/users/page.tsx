"use client";

import { UserRoleEnum } from "@workspace/contracts";
import type { UserQueryType } from "@workspace/contracts/admin";
import type { UserResponse } from "@workspace/contracts/user";
import { Badge } from "@workspace/ui/components/badge";

import { useAdminUsers } from "@/hooks/admin";
import ListPage from "@workspace/ui/shared/ListPage";
import type { ColumnConfig } from "@workspace/ui/shared/GenericTable";
import type { SearchByOption } from "@workspace/ui/shared/SearchToolbar";
import { formatDate } from "@workspace/shared/utils";
import UserCard from "@workspace/ui/shared/UserCard";

const userColumns: ColumnConfig<UserResponse, UserQueryType>[] = [
  {
    header: "Name",
    accessor: (u) => (
      <div className="flex items-center gap-2 min-w-40">
        <UserCard currentUser={u} variant="avatar" />
        <span className="font-medium text-sm truncate" title={u.displayName}>
          {u.displayName}
        </span>
      </div>
    ),
    sortKey: "displayName",
  },
  {
    header: "Role",
    accessor: (u) => <Badge variant="secondary">{u.role}</Badge>,
    sortKey: "role",
  },
  {
    header: "Status",
    accessor: (u) => (
      <Badge variant={u.status === "suspended" ? "destructive" : "secondary"}>
        {u.status}
      </Badge>
    ),
    sortKey: "status",
  },

  {
    header: "Email",
    accessor: "email",
    sortKey: "email",
  },
  {
    header: "Last Login",
    accessor: (u) => (u.lastLoginAt ? formatDate(u.lastLoginAt) : "—"),
    sortKey: "lastLoginAt",
  },
  {
    header: "Created",
    accessor: (u) => formatDate(u.createdAt),
    sortKey: "createdAt",
  },
];

const userSearchByOptions: SearchByOption<UserQueryType>[] = [
  { value: "id", label: "User Id" },
  { value: "displayName", label: "Name" },
  { value: "email", label: "Email" },
];

const page = () => {
  return (
    <ListPage
      dataKey="users"
      columns={userColumns}
      searchByOptions={userSearchByOptions}
      useListHook={useAdminUsers}
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
