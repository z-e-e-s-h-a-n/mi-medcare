"use client";

import { CUUserSchema } from "@workspace/contracts/admin";
import {
  UserRoleEnum,
  UserStatusEnum,
  type BaseCUFormProps,
} from "@workspace/contracts";

import { Button } from "@workspace/ui/components/button";
import { InputField } from "@workspace/ui/components/input-field";
import { SelectField } from "@workspace/ui/components/select-field";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@workspace/ui/components/card";

import { useState } from "react";
import { KeyRound, ShieldCheck, UserRound } from "lucide-react";
import { useAdminUser } from "@/hooks/admin";
import { GenericForm } from "@workspace/ui/shared/GenericForm";

const CUUserForm = (props: BaseCUFormProps) => {
  const [changePassword, setChangePassword] = useState(false);

  return (
    <GenericForm
      {...props}
      entityName="User"
      useQuery={useAdminUser}
      schema={CUUserSchema}
      defaultValues={{
        firstName: "",
        lastName: "",
        displayName: "",
        email: "",
        role: "author",
        status: "active",
      }}
      mapDataToValues={(data) => ({
        ...data,
        email: data.email ?? "",
      })}
    >
      {(form, formType) => (
        <>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <UserRound className="size-5" />
                Basic Information
              </CardTitle>
              <CardDescription>
                Core profile details shown around the dashboard.
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4 md:grid-cols-2">
              <InputField form={form} name="firstName" label="First Name" />
              <InputField form={form} name="lastName" label="Last Name" />

              <form.Subscribe
                selector={(s) => ({
                  firstName: s.values.firstName,
                  lastName: s.values.lastName,
                })}
              >
                {({ firstName, lastName }) => {
                  const displayName = `${firstName} ${lastName || ""}`.trim();

                  if (displayName) {
                    form.setFieldValue("displayName", displayName);
                  }

                  return (
                    <InputField
                      form={form}
                      name="displayName"
                      label="Display Name"
                      className="md:col-span-2"
                    />
                  );
                }}
              </form.Subscribe>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <KeyRound className="size-5" />
                Account & Security
              </CardTitle>
              <CardDescription>
                Login email and optional password update.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <InputField
                form={form}
                name="email"
                label="Email"
                type="email"
                disabled={formType === "update"}
              />

              {!changePassword ? (
                <Button
                  type="button"
                  variant="secondary"
                  size="sm"
                  className="w-fit"
                  onClick={() => setChangePassword(true)}
                >
                  {formType === "add" ? "Set Password" : "Change Password"}
                </Button>
              ) : (
                <div className="space-y-3 rounded-lg border p-4 bg-muted/10">
                  <InputField
                    form={form}
                    name="password"
                    label="New Password"
                    type="password"
                    autoComplete="new-password"
                  />

                  <div className="flex gap-2">
                    <Button
                      type="button"
                      size="sm"
                      onClick={() => {
                        form.setFieldValue("password", "");
                      }}
                    >
                      Reset
                    </Button>
                    <Button
                      type="button"
                      size="sm"
                      variant="secondary"
                      onClick={() => {
                        setChangePassword(false);
                        form.setFieldValue("password", undefined);
                      }}
                    >
                      Cancel
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ShieldCheck className="size-5" />
                Role & Status
              </CardTitle>
              <CardDescription>
                Access level and current account state.
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4 md:grid-cols-2">
              <SelectField
                form={form}
                name="role"
                label="Role"
                options={UserRoleEnum.options}
              />
              <SelectField
                form={form}
                name="status"
                label="Status"
                options={UserStatusEnum.options}
              />
            </CardContent>
          </Card>
        </>
      )}
    </GenericForm>
  );
};

export default CUUserForm;
