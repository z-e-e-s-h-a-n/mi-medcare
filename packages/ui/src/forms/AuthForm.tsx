/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { cn } from "@workspace/ui/lib/utils";
import { Button } from "@workspace/ui/components/button";
import { Card, CardContent } from "@workspace/ui/components/card";
import { FieldDescription } from "@workspace/ui/components/field";
import { useForm, useStore } from "@tanstack/react-form";
import { toast } from "sonner";
import { Form } from "@workspace/ui/components/form";
import Link from "next/link";
import { GalleryVerticalEnd, LoaderCircle } from "lucide-react";
import OtpModal, { type OtpMeta } from "@workspace/ui/components/otp-modal";
import { useEffect, useState } from "react";
import {
  requestOtp,
  resetPassword,
  signIn,
  validateOtp,
} from "@workspace/sdk/auth";
import SocialAuthField from "./SocialAuthField";
import { useRouter } from "next/navigation";
import { InputField } from "@workspace/ui/components/input-field";
import z from "zod";
import {
  type AuthFormType,
  passwordSchema,
  emailSchema,
  type OtpPurpose,
  type ValidateOtpType,
} from "@workspace/contracts";
import Image from "next/image";
import { appName } from "@workspace/shared/constants";

interface AuthFormProps {
  formType: AuthFormType;
  className?: string;
  queryParams: ValidateOtpType;
}

export function AuthForm({ className, formType, queryParams }: AuthFormProps) {
  const { purpose, secret, type } = queryParams;
  const [email, setEmail] = useState(queryParams.email);
  const [isOpen, setIsOpen] = useState(false);
  const [otpMeta, setOtpMeta] = useState<OtpMeta>();
  const [isLoading, setIsLoading] = useState(false);
  const [otpPurpose, setOtpPurpose] = useState<OtpPurpose>(purpose);
  const [redirectUrl, setRedirectUrl] = useState<string>();

  const router = useRouter();
  const schema = z.object({
    email: emailSchema,
    ...(formType.includes("sign") && {
      password: passwordSchema,
    }),
    ...(formType.includes("password") &&
      otpMeta?.valid && { password: passwordSchema }),
  });

  const form = useForm({
    defaultValues: {
      email,
      password: formType.includes("sign") ? "" : undefined,
      confirmPassword: formType !== "sign-in" ? "" : undefined,
      rememberDevice: true,
    } as {
      email: string;
      password?: string;
      confirmPassword?: string;
      rememberDevice?: boolean;
    },
    validators: {
      onSubmit: schema as any,
    },
    onSubmit: async ({ value }) => {
      setIsLoading(true);
      try {
        let message = `${formType} successfully!`;
        if (formType === "sign-in") {
          const res = await signIn(value);
          message = res.message;
          setRedirectUrl("/");
          if (res.action === "verifyMfa") {
            setOtpPurpose("verifyMfa");
            setIsOpen(true);
          }
        } else if (formType.includes("password")) {
          if (!otpMeta?.token) {
            const nextPurpose: OtpPurpose =
              formType === "set-password" ? "setPassword" : "resetPassword";
            setOtpPurpose(nextPurpose);
            const res = await requestOtp({ email, purpose: nextPurpose });
            message = res.message;
            setIsOpen(true);
          } else {
            const res = await resetPassword({
              email,
              purpose: otpPurpose,
              secret: otpMeta?.token,
              newPassword: value.password!,
            });
            message = res.message;
            setRedirectUrl("/auth/sign-in");
          }
        }
        toast.success(message);
      } catch (err: any) {
        if (err.action === "verifyEmail") {
          setOtpPurpose("verifyEmail");
          setRedirectUrl("/auth/sign-in");
          setIsOpen(true);
        }
        toast.error(`${formType} Error`, {
          description: err?.message,
        });
      } finally {
        setIsLoading(false);
      }
    },
  });

  const formEmail = useStore(form.store, (state) => state.values.email);

  useEffect(() => {
    if (!secret) return;

    const verifySecret = async () => {
      try {
        const res = await validateOtp({
          email,
          purpose: otpPurpose,
          secret,
          type,
        });
        setOtpMeta({ valid: true, token: res.data?.secret });
        toast.success(res.message);
      } catch (err: any) {
        toast.error("Failed to verify Otp", {
          description: err?.message,
        });
      }
    };
    void verifySecret();
  }, [email, otpPurpose, secret, type]);

  useEffect(() => {
    if (otpMeta?.valid) {
      form.reset({
        email,
        password: "",
        confirmPassword: "",
      });
    }
  }, [email, form, otpMeta?.valid]);

  useEffect(() => {
    if (redirectUrl && !isOpen) {
      router.push(redirectUrl);
    }
  }, [redirectUrl, isOpen, router]);

  useEffect(() => {
    if (formEmail) {
      setEmail(formEmail);
    }
  }, [formEmail]);

  return (
    <div className={cn("flex flex-col gap-6", className)}>
      <Card className="overflow-hidden p-0">
        <CardContent className="grid p-0 md:grid-cols-2">
          <Form form={form} className="p-6 md:p-8">
            <div className="flex flex-col items-center gap-2 text-center">
              {formType === "sign-in" && (
                <Link
                  href="#"
                  className="flex flex-col items-center gap-2 font-medium"
                >
                  <GalleryVerticalEnd className="size-6" />
                  <span className="sr-only">{appName.default}</span>
                </Link>
              )}
              <h1 className="text-2xl font-bold capitalize">
                {formType === "sign-in"
                  ? "Welcome Back"
                  : formType.split("-").join(" ")}
              </h1>
              <p className="text-muted-foreground text-sm text-balance">
                {formType === "sign-in"
                  ? `Login to your ${appName.default} account`
                  : "Enter your email to continue"}
              </p>
            </div>
            <InputField
              form={form}
              name="email"
              label="Email"
              type="email"
              disabled={!!otpMeta?.valid}
            />
            <div className={cn("flex flex-col gap-4")}>
              {(!formType.includes("password") || !!otpMeta?.valid) && (
                <>
                  <InputField
                    form={form}
                    name="password"
                    type="password"
                    placeholder="Password"
                    label={
                      <>
                        <span>Password</span>
                        {formType === "sign-in" && (
                          <Link
                            href="reset-password"
                            className="text-sm text-muted-foreground underline-offset-2 hover:underline"
                          >
                            Forgot your password?
                          </Link>
                        )}
                      </>
                    }
                  />
                  {formType !== "sign-in" && (
                    <InputField
                      form={form}
                      name="confirmPassword"
                      type="password"
                      label="Confirm Password"
                      validators={{
                        onChangeListenTo: ["password"],
                        onChange: ({ value, fieldApi }) => {
                          if (
                            value !== fieldApi.form.getFieldValue("password")
                          ) {
                            return {
                              message: "Passwords do not match",
                            };
                          }
                          return undefined;
                        },
                      }}
                    />
                  )}
                </>
              )}
            </div>

            {formType === "sign-in" && (
              <InputField
                form={form}
                type="checkbox"
                name="rememberDevice"
                label="Remember Me"
              />
            )}

            <form.Subscribe selector={(state: any) => state.canSubmit}>
              {(canSubmit: boolean) => (
                <Button
                  size="lg"
                  disabled={!canSubmit || isLoading}
                  type="submit"
                  className="capitalize"
                >
                  {formType === "sign-in"
                    ? "Login"
                    : otpMeta?.valid
                      ? formType.split("-").join(" ")
                      : "Send Otp"}
                  {isLoading && <LoaderCircle className="animate-spin" />}
                </Button>
              )}
            </form.Subscribe>

            <SocialAuthField />
            <FieldDescription className="flex-center gap-2">
              {formType === "sign-in" ? (
                <span>Need access? Contact an administrator.</span>
              ) : (
                <>
                  <span>Back to Sign in</span>
                  <Link href="sign-in">Sign in</Link>
                </>
              )}
            </FieldDescription>
          </Form>

          <div className="bg-muted relative hidden md:block">
            <Image
              src="/placeholder.svg"
              alt="Image"
              fill
              className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
            />
          </div>
        </CardContent>
      </Card>
      <OtpModal
        open={isOpen}
        setOpen={setIsOpen}
        email={email}
        purpose={otpPurpose}
        redirectUrl={redirectUrl}
        setOtpMeta={setOtpMeta}
      />
      <FieldDescription className="px-6 text-center">
        By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
        and <a href="#">Privacy Policy</a>.
      </FieldDescription>
    </div>
  );
}
