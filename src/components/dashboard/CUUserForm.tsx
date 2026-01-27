"use client";
import { Form } from "@components/ui/form";
import { useAdminUser } from "@hooks/admin";
import { CUUserSchema } from "@schemas/admin";
import { useForm } from "@tanstack/react-form";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { InputField } from "@components/ui/input-field";
import { SelectField } from "@components/ui/select-field";
import { Button } from "@components/ui/button";
import { UserRoleEnum, UserStatusEnum } from "@schemas/enums";
import { Card, CardContent, CardHeader, CardTitle } from "@components/ui/card";
import { LoaderCircle } from "lucide-react";
import { useState } from "react";
import CUFormSkeleton from "../skeleton/CUFormSkeleton";

const CUUserForm = ({ entityId, formType }: BaseCUFormProps) => {
  const router = useRouter();
  const { data, mutateAsync, isPending, isFetching } = useAdminUser(entityId);
  const [changePassword, setChangePassword] = useState(false);

  const form = useForm({
    defaultValues: {
      firstName: "",
      lastName: "",
      displayName: "",
      email: "",
      password: formType === "add" ? "" : undefined,
      role: "author",
      status: "pending",
      ...data,
    } as CUUserType,
    validators: {
      onSubmit: CUUserSchema,
    },
    onSubmit: async ({ value }) => {
      try {
        await mutateAsync(value);
        toast.success(
          `User ${formType === "add" ? "created" : "updated"} successfully`,
        );
        router.push("/dashboard/admin/users");
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (err: any) {
        console.log("error:", err);
        toast.error(err.message || "Failed to save user");
      }
    },
  });

  console.log("data", data);

  if (isFetching) return <CUFormSkeleton />;

  return (
    <div className="container mx-auto p-6 max-w-4xl">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold">
            {formType === "add" ? "Create New" : "Update"} User
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Form form={form} isPending={isPending}>
            <div className="space-y-6">
              {/* Personal Information Section */}
              <section>
                <h3 className="text-lg font-semibold mb-4">
                  Personal Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <InputField
                    form={form}
                    name="firstName"
                    label="First Name"
                    placeholder="Enter first name"
                  />
                  <InputField
                    form={form}
                    name="lastName"
                    label="Last Name"
                    placeholder="Enter last name (optional)"
                  />
                  <form.Subscribe
                    selector={(state) => ({
                      firstName: state.values.firstName,
                      lastName: state.values.lastName,
                    })}
                  >
                    {({ firstName, lastName }) => {
                      const displayName =
                        `${firstName} ${lastName || ""}`.trim();
                      if (!!displayName) {
                        form.setFieldValue("displayName", displayName);
                      }
                      return (
                        <InputField
                          form={form}
                          name="displayName"
                          label="Display Name"
                          placeholder="Will be auto-generated"
                        />
                      );
                    }}
                  </form.Subscribe>
                </div>
              </section>

              {/* Account Information Section */}
              <section>
                <h3 className="text-lg font-semibold mb-4">
                  Account Information
                </h3>
                <div className="space-y-4">
                  <InputField
                    form={form}
                    name="email"
                    label="Email"
                    type="email"
                    placeholder="user@example.com"
                    disabled={formType === "update"}
                  />
                  {formType === "add" && (
                    <>
                      <InputField
                        form={form}
                        name="password"
                        label="Password"
                        type="password"
                        placeholder="Enter password"
                      />
                    </>
                  )}
                  {formType === "update" && (
                    <div className="flex flex-col gap-4 mt-4">
                      {!changePassword ? (
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          className="w-fit"
                          onClick={() => setChangePassword(true)}
                        >
                          Update Password
                        </Button>
                      ) : (
                        <div className="flex flex-col gap-3 p-4 border rounded-lg bg-muted/10">
                          <InputField
                            form={form}
                            name="password"
                            label="New Password"
                            type="password"
                            placeholder="Enter a new secure password"
                          />
                          <div className="flex flex-col md:flex-row md:gap-3 gap-2 mt-2">
                            <Button
                              type="button"
                              size="sm"
                              className="w-full md:w-auto"
                              onClick={() => {
                                setChangePassword(false);
                              }}
                            >
                              Save Password
                            </Button>
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              className="w-full md:w-auto text-muted-foreground"
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
                    </div>
                  )}
                </div>
              </section>

              {/* Role & Status Section */}
              <section>
                <h3 className="text-lg font-semibold mb-4">Role & Status</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <SelectField
                    form={form}
                    name="role"
                    label="Role"
                    options={UserRoleEnum.options.filter(
                      (opt) => opt !== "admin",
                    )}
                  />
                  <SelectField
                    form={form}
                    name="status"
                    label="Status"
                    options={UserStatusEnum.options}
                  />
                </div>
              </section>

              {/* Form Actions */}
              <div className="flex items-center justify-between pt-6 border-t">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => router.push("/dashboard/admin/users")}
                  disabled={isPending}
                >
                  Cancel
                </Button>
                <form.Subscribe selector={(state) => state.canSubmit}>
                  {(canSubmit) => (
                    <Button
                      type="submit"
                      disabled={!canSubmit || isPending}
                      className="min-w-32"
                    >
                      {isPending && (
                        <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
                      )}
                      {formType === "add" ? "Create User" : "Update User"}
                    </Button>
                  )}
                </form.Subscribe>
              </div>
            </div>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default CUUserForm;
