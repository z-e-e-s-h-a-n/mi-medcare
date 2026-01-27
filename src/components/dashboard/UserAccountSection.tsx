/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { Form } from "@components/ui/form";
import { InputField } from "@components/ui/input-field";
import { Button } from "@components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@components/ui/card";
import { useForm } from "@tanstack/react-form";
import { toast } from "sonner";
import { useEffect, useState } from "react";
import { Mail, Shield } from "lucide-react";
import OtpModal from "@components/ui/otp-modal";
import z from "zod";
import { emailSchema, passwordSchema } from "@schemas/auth";
import {
  requestChangeEmail,
  requestOtp,
  resetPassword,
} from "@lib/auth/client";

interface AccountSectionProps {
  user: UserResponse;
}

const AccountSection = ({ user }: AccountSectionProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [otpPurpose, setOtpPurpose] = useState<OtpPurpose>();
  const [otpToken, setOtpToken] = useState<string>();

  const schema = z.object({
    newEmail:
      otpPurpose === "changeEmail" ? emailSchema : z.string().optional(),
    newPassword:
      otpPurpose === "resetPassword" ? passwordSchema : z.string().optional(),
    confirmPassword:
      otpPurpose === "resetPassword" ? passwordSchema : z.string().optional(),
  });

  const form = useForm({
    defaultValues: {
      newEmail: "",
      newPassword: "",
      confirmPassword: "",
    },
    validators: {
      onSubmit: schema as any,
    },
    onSubmit: ({ value }) => {
      let message = "";
      try {
        if (!otpToken) throw new Error("Otp Token is missing");

        if (otpPurpose === "changeEmail") {
          requestChangeEmail({
            email: user.email,
            newEmail: value.newEmail,
            purpose: otpPurpose,
            secret: otpToken,
          });

          message = "Change Email Req Successfully";
        } else if (otpPurpose === "resetPassword") {
          resetPassword({
            email: user.email,
            purpose: otpPurpose,
            newPassword: value.newPassword,
            secret: otpToken,
          });

          message = "Password Update Successfully";
        }

        toast.success(message);
      } catch (error: any) {
        toast.error(error.message);
      } finally {
        setOtpPurpose(undefined);
        setOtpToken(undefined);
      }
    },
  });

  const handleOpen = (purpose: "resetPassword" | "changeEmail") => {
    setOtpPurpose(purpose);
    setIsOpen(true);
  };

  useEffect(() => {
    console.log(isOpen || otpToken || !otpPurpose);
    console.log(isOpen, otpToken, !otpPurpose);

    if ((!isOpen && otpToken) || !otpPurpose) return;
    const otpRequest = async () => {
      try {
        const res = await requestOtp({
          email: user.email,
          purpose: otpPurpose,
        });
        toast.success(res.message);
      } catch (err: any) {
        toast.error("Failed to request Otp", {
          description: err?.message,
        });
      }
    };

    otpRequest();
  }, [isOpen, otpPurpose, otpToken, user.email]);

  return (
    <Form form={form} className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Mail className="size-5" />
            Email Settings
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between p-4 rounded-lg border bg-card">
            <div>
              <p className="font-medium">Email Address</p>
              <p className="text-muted-foreground text-sm">{user.email}</p>
              <p className="text-xs mt-1">
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
              type={!otpToken ? "button" : "submit"}
              variant="outline"
              size="sm"
              onClick={() => handleOpen("changeEmail")}
            >
              {otpToken && otpPurpose === "changeEmail"
                ? "Cancel"
                : "Change Email"}
            </Button>
          </div>

          {otpToken && otpPurpose === "changeEmail" && (
            <div className="space-y-4 p-4 border rounded-lg">
              <InputField
                form={form}
                name="newEmail"
                label="New Email"
                type="email"
                placeholder="Enter new email address"
              />
              <Button
                type="submit"
                className="w-full sm:w-auto"
                disabled={form.state.isSubmitting}
              >
                Change Email
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="size-5" />
            Password & Security
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 rounded-lg border bg-card">
              <div>
                <p className="font-medium">Password</p>
                <p className="text-muted-foreground text-sm">
                  Last changed: {new Date(user.updatedAt).toLocaleDateString()}
                </p>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleOpen("resetPassword")}
              >
                {otpToken && otpPurpose === "resetPassword"
                  ? "Cancel"
                  : "Change Password"}
              </Button>
            </div>

            {otpToken && otpPurpose === "resetPassword" && (
              <div className="space-y-4 p-4 border rounded-lg">
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
                <Button
                  type={!otpToken ? "button" : "submit"}
                  className="w-full sm:w-auto"
                  disabled={form.state.isSubmitting}
                >
                  Update Password
                </Button>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {otpPurpose && (
        <OtpModal
          open={isOpen}
          setOpen={setIsOpen}
          setOtpToken={setOtpToken}
          email={user.email}
          purpose={otpPurpose}
        />
      )}
    </Form>
  );
};

export default AccountSection;
