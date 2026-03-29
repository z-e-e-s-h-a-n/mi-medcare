"use client";

import { useForm } from "@tanstack/react-form";
import { toast } from "sonner";
import { useEffect, useState } from "react";
import { Mail, Shield, Loader2 } from "lucide-react";
import z from "zod";
import {
  emailSchema,
  passwordSchema,
  type OtpPurpose,
  MfaMethodEnum,
} from "@workspace/contracts";
import type { UserResponse } from "@workspace/contracts/user";
import {
  requestOtp,
  requestUpdateEmail,
  resetPassword,
  updateMfa,
} from "@workspace/sdk/auth";
import { Form } from "@workspace/ui/components/form";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@workspace/ui/components/card";
import { Button } from "@workspace/ui/components/button";
import { InputField } from "@workspace/ui/components/input-field";
import OtpModal, { type OtpMeta } from "@workspace/ui/components/otp-modal";
import { SelectField } from "@workspace/ui/components/select-field";
import { Badge } from "@workspace/ui/components/badge";
import useUser from "@workspace/ui/hooks/use-user";
import UserSessions from "./UserSessions";

interface AccountSectionProps {
  user: UserResponse;
}

const MFA_OPTIONS = MfaMethodEnum.options.filter(
  (method) => method === "email" || method === "authApp",
);

const AccountSection = ({ user }: AccountSectionProps) => {
  const { refetchUser } = useUser();
  const [isOpen, setIsOpen] = useState(false);
  const [otpPurpose, setOtpPurpose] = useState<OtpPurpose>();
  const [otpMeta, setOtpMeta] = useState<OtpMeta>();
  const [isLoading, setIsLoading] = useState(false);

  const email = user.email ?? "";

  const schema = z.object({
    newEmail:
      otpPurpose === "updateEmail" ? emailSchema : z.string().optional(),
    newPassword:
      otpPurpose === "updatePassword" ? passwordSchema : z.string().optional(),
    confirmPassword:
      otpPurpose === "updatePassword" ? passwordSchema : z.string().optional(),
    preferredMfa:
      otpPurpose === "updateMfa"
        ? z.enum(["email", "authApp"])
        : z.enum(["email", "authApp"]).optional(),
  });

  const form = useForm({
    defaultValues: {
      newEmail: otpPurpose === "updateEmail" ? "" : undefined,
      newPassword: otpPurpose === "updatePassword" ? "" : undefined,
      confirmPassword: otpPurpose === "updatePassword" ? "" : undefined,
      preferredMfa: user.preferredMfa === "authApp" ? "authApp" : "email",
    },
    validators: {
      onSubmit: schema as any,
    },
    onSubmit: async ({ value }) => {
      let message = "";
      try {
        setIsLoading(true);
        if (!otpMeta?.token) throw new Error("OTP token is missing");

        if (otpPurpose === "updateEmail") {
          const res = await requestUpdateEmail({
            email,
            newEmail: value.newEmail!,
            purpose: otpPurpose,
            secret: otpMeta.token,
          });

          message = res.message;
        } else if (otpPurpose === "updatePassword") {
          const res = await resetPassword({
            email,
            purpose: otpPurpose,
            newPassword: value.newPassword!,
            secret: otpMeta.token,
          });

          message = res.message;
        } else if (otpPurpose === "updateMfa") {
          const res = await updateMfa({
            email,
            purpose: otpPurpose,
            preferredMfa: value.preferredMfa as "email" | "authApp",
            secret: otpMeta.token,
          });
          message = res.message;
        }

        toast.success(message);
        form.reset();
        void refetchUser();
      } catch (error: any) {
        toast.error(error.message || "Operation failed");
      } finally {
        setOtpPurpose(undefined);
        setOtpMeta(undefined);
        setIsLoading(false);
      }
    },
  });

  const handleOpen = (purpose: OtpPurpose) => {
    setOtpMeta(undefined);
    setOtpPurpose(purpose);
    setIsOpen(true);
  };

  useEffect(() => {
    if (!otpPurpose || !email || !isOpen || otpMeta?.valid) return;

    const otpRequest = async () => {
      try {
        const res = await requestOtp({
          email,
          purpose: otpPurpose,
        });
        toast.success(res.message);
      } catch (err: any) {
        toast.error("Failed to request OTP", {
          description: err?.message,
        });
      }
    };

    void otpRequest();
  }, [email, isOpen, otpMeta?.valid, otpPurpose]);

  useEffect(() => {
    if (otpMeta?.valid && !otpMeta.token) {
      void refetchUser();
      setOtpPurpose(undefined);
    }
  }, [otpMeta?.token, otpMeta?.valid, refetchUser]);

  return (
    <Form form={form}>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Mail className="size-5" />
            Login Email
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-4 rounded-lg border p-4">
            <div className="flex items-center flex-wrap justify-between gap-4">
              <div className="space-y-1">
                <p className="font-medium">Email Address</p>
                <p className="text-sm text-muted-foreground">{user.email}</p>
                <p className="text-xs">
                  Status:{" "}
                  <span
                    className={
                      user.isEmailVerified ? "text-green-600" : "text-amber-600"
                    }
                  >
                    {user.isEmailVerified ? "Verified" : "Unverified"}
                  </span>
                </p>
              </div>
              <Button
                variant="secondary"
                size="sm"
                onClick={() => handleOpen("updateEmail")}
                disabled={isLoading}
              >
                Change Email
              </Button>
            </div>

            {otpMeta?.valid && otpPurpose === "updateEmail" && (
              <div className="space-y-4 rounded-lg border bg-muted/50 p-4">
                <InputField
                  form={form}
                  name="newEmail"
                  label="New Email"
                  type="email"
                  placeholder="Enter new email address"
                />
                <div className="flex gap-2">
                  <Button type="submit" disabled={isLoading}>
                    Save Email
                    {isLoading && <Loader2 className="animate-spin" />}
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => {
                      setOtpMeta(undefined);
                      setOtpPurpose(undefined);
                    }}
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="size-5" />
            Security Settings
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between rounded-lg border p-4">
              <div className="space-y-1">
                <p className="font-medium">Multi-Factor Authentication</p>
                <div className="text-sm text-muted-foreground">
                  {user.preferredMfa ? (
                    <div className="flex items-center gap-2">
                      <Badge
                        variant="secondary"
                        className="bg-green-700/30 text-green-700"
                      >
                        Enabled
                      </Badge>
                      <Badge variant="secondary">{user.preferredMfa}</Badge>
                    </div>
                  ) : (
                    <span>Disabled</span>
                  )}
                </div>
              </div>

              <div className="flex gap-2">
                <Button
                  size="sm"
                  variant="secondary"
                  onClick={() => handleOpen("updateMfa")}
                  disabled={isLoading}
                >
                  {user.preferredMfa ? "Change Method" : "Enable MFA"}
                </Button>

                {user.preferredMfa && (
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => handleOpen("disableMfa")}
                    disabled={isLoading}
                  >
                    Disable
                  </Button>
                )}
              </div>
            </div>

            {otpMeta?.valid && otpPurpose === "updateMfa" && (
              <div className="space-y-4 rounded-lg border p-4">
                <SelectField
                  form={form}
                  name="preferredMfa"
                  label="Select MFA Method"
                  options={MFA_OPTIONS.filter((m) => m !== user.preferredMfa)}
                />

                <div className="flex gap-2">
                  <Button type="submit" disabled={isLoading}>
                    Save MFA Settings
                    {isLoading && <Loader2 className="animate-spin" />}
                  </Button>

                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => {
                      setOtpMeta(undefined);
                      setOtpPurpose(undefined);
                    }}
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            )}
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between rounded-lg border bg-card p-4">
              <div>
                <p className="font-medium">Password</p>
                <p className="text-sm text-muted-foreground">
                  Last changed: {new Date(user.updatedAt).toLocaleDateString()}
                </p>
              </div>
              <Button
                variant="secondary"
                size="sm"
                onClick={() => handleOpen("updatePassword")}
                disabled={isLoading}
              >
                Change Password
              </Button>
            </div>

            {otpMeta?.valid && otpPurpose === "updatePassword" && (
              <div className="space-y-4 rounded-lg border p-4">
                <InputField
                  form={form}
                  name="newPassword"
                  label="New Password"
                  type="password"
                  placeholder="Enter new password"
                />
                <InputField
                  form={form}
                  name="confirmPassword"
                  label="Confirm Password"
                  type="password"
                  placeholder="Confirm new password"
                  validators={{
                    onChangeListenTo: ["newPassword"],
                    onChange: ({ value, fieldApi }) =>
                      value !== fieldApi.form.getFieldValue("newPassword")
                        ? { message: "Passwords do not match" }
                        : undefined,
                  }}
                />
                <div className="flex gap-2">
                  <Button type="submit" disabled={isLoading}>
                    Update Password
                    {isLoading && <Loader2 className="animate-spin" />}
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => {
                      setOtpMeta(undefined);
                      setOtpPurpose(undefined);
                    }}
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <UserSessions />

      {otpPurpose && email && (
        <OtpModal
          open={isOpen}
          setOpen={setIsOpen}
          setOtpMeta={setOtpMeta}
          email={email}
          purpose={otpPurpose}
        />
      )}
    </Form>
  );
};

export default AccountSection;
