"use client";
import { GenericDetailsPage } from "@components/dashboard/GenericDetailsPage";
import { Badge } from "@components/ui/badge";
import { Card, CardContent } from "@components/ui/card";
import { useAdminUser } from "@hooks/admin";
import Image from "next/image";
import React from "react";

const Page = ({ params }: AppPageProps<{ id: string }>) => {
  const { id } = React.use(params);

  return (
    <GenericDetailsPage<UserResponse>
      entityId={id}
      entityName="User"
      useQuery={useAdminUser}
      editPath={`/dashboard/admin/users/${id}/edit`}
      backPath="/dashboard/admin/users"
      sections={[
        {
          title: "Profile Information",
          fields: [
            { label: "First Name", accessor: "firstName" },
            { label: "Last Name", accessor: "lastName" },
            { label: "Display Name", accessor: "displayName" },
            { label: "Email", accessor: "email" },
            {
              label: "Role",
              accessor: "role",
              render: (value) => <Badge variant="outline">{value}</Badge>,
            },
            {
              label: "Status",
              accessor: "status",
              render: (value) => <Badge variant="outline">{value}</Badge>,
            },
          ],
          columns: 3,
        },
        {
          title: "Account Details",
          fields: [
            {
              label: "Email Verified",
              accessor: "isEmailVerified",
              render: (value) => (
                <Badge variant={value ? "default" : "outline"}>
                  {value ? "Verified" : "Pending"}
                </Badge>
              ),
            },
            {
              label: "Theme",
              accessor: "theme",
            },
            {
              label: "Last Login",
              accessor: "lastLoginAt",
              format: (value) =>
                value ? new Date(value).toLocaleString() : "Never",
            },
            {
              label: "Created At",
              accessor: "createdAt",
              format: (value) => new Date(value).toLocaleString(),
            },
          ],
          columns: 2,
        },
      ]}
      renderHeader={(data) => (
        <Card className="bg-linear-to-r from-primary/5 to-primary/10 border-primary/20">
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              {data.image && (
                <Image
                  src={data.image.url}
                  alt={data.displayName}
                  width={200}
                  height={200}
                  className="w-20 h-20 rounded-full object-cover"
                />
              )}
              <div>
                <h2 className="text-2xl font-bold">{data.displayName}</h2>
                <p className="text-muted-foreground">{data.email}</p>
                <div className="flex items-center gap-2 mt-2">
                  <Badge variant="outline">{data.role}</Badge>
                  <Badge
                    variant={data.status === "active" ? "default" : "outline"}
                  >
                    {data.status}
                  </Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    />
  );
};

export default Page;
