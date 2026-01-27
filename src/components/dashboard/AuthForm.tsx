/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { cn } from "@lib/utils/general";
import { Button } from "@components/ui/button";
import { Card, CardContent } from "@components/ui/card";
import { FieldDescription } from "@components/ui/field";
import { useForm, useStore } from "@tanstack/react-form";
import { toast } from "sonner";
import { Form } from "@components/ui/form";
import Link from "next/link";
import { GalleryVerticalEnd, LoaderCircle } from "lucide-react";
import OtpModal from "@components/ui/otp-modal";
import { useEffect, useState } from "react";
import SocialAuthField from "./SocialAuthField";
import { useRouter } from "next/navigation";
import { InputField } from "@components/ui/input-field";
import { emailSchema, nameSchema, passwordSchema } from "@schemas/auth";
import {
  requestOtp,
  resetPassword,
  signIn,
  signUp,
  validateOtp,
} from "@lib/auth/client";
import Image from "next/image";
import z from "zod";

export type AuthQueryParams = ValidateOtpType & {
  error?: string;
  message?: string;
};

interface AuthFormProps {
  formType: AuthFormType;
  className?: string;
  queryParams: AuthQueryParams;
}

function AuthForm({ className, formType, queryParams }: AuthFormProps) {
  const { purpose, secret, type, error, message } = queryParams;
  const [email, setEmail] = useState(queryParams.email);
  const [isOpen, setIsOpen] = useState(false);
  const [otpToken, setOtpToken] = useState<string>();
  const [isLoading, setIsLoading] = useState(false);
  const [otpPurpose, setOtpPurpose] = useState<OtpPurpose>(purpose);
  const [redirectUrl, setRedirectUrl] = useState<string>();

  const router = useRouter();
  const schema = z.object({
    email: emailSchema,
    ...(formType.includes("sign") && {
      password: passwordSchema,
    }),
    ...(formType === "sign-up" && {
      firstName: nameSchema,
      lastName: nameSchema.optional(),
    }),
    ...(formType.includes("set-password") &&
      otpToken && { password: passwordSchema }),
  });

  const form = useForm({
    defaultValues: {
      email,
      password: formType.includes("sign") ? "" : undefined,
      confirmPassword: formType === "sign-up" ? "" : undefined,
      firstName: "",
      lastName: undefined,
    } as SignUpType & { confirmPassword?: string },
    validators: {
      onSubmit: schema as any,
    },
    onSubmit: async ({ value }) => {
      setIsLoading(true);
      try {
        let message = `${formType} successfully!`;
        if (formType === "sign-up") {
          setOtpPurpose("verifyEmail");
          const res = await signUp(value);
          message = res.message;
          setRedirectUrl("/auth/sign-in");
          setIsOpen(true);
        } else if (formType === "sign-in") {
          const res = await signIn(value);
          message = res.message;
          setRedirectUrl("/dashboard");
        } else if (formType.includes("password")) {
          if (!otpToken) {
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
              secret: otpToken,
              newPassword: value.password!,
            });
            message = res.message;
            setRedirectUrl("/auth/sign-in");
          }
        }
        toast.success(message);
      } catch (err: any) {
        console.log("err ......", err);
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
        setOtpToken(res.data?.secret);
        toast.success(res.message);
      } catch (err: any) {
        toast.error("Failed to verify Otp", {
          description: err?.message,
        });
      }
    };
    verifySecret();
  }, [secret, email, otpPurpose, type]);

  useEffect(() => {
    if (otpToken) {
      form.reset({
        firstName: "",
        email,
        password: "",
        confirmPassword: "",
      });
    }
  }, [email, form, otpToken]);

  useEffect(() => {
    if (redirectUrl && !isOpen) {
      router.push(redirectUrl);
    }
  }, [redirectUrl, isOpen, router]);

  useEffect(() => {
    if (error && message) {
      toast.error(error, {
        description: message,
      });
    }
  }, [error, message]);

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
                  <span className="sr-only">MI MedCare LLC</span>
                </Link>
              )}
              <h1 className="text-2xl font-bold capitalize">
                {formType === "sign-up"
                  ? "Create your account"
                  : formType === "sign-in"
                    ? "Welcome Back"
                    : formType.split("-").join(" ")}
              </h1>
              <p className="text-muted-foreground text-sm text-balance">
                {formType === "sign-up"
                  ? "Enter your email below to create your account"
                  : formType === "sign-in"
                    ? "Login to your account"
                    : `Enter your email to continue`}
              </p>
            </div>
            {formType === "sign-up" && (
              <div className="flex items-center gap-4">
                <InputField form={form} name="firstName" label="FirstName" />
                <InputField form={form} name="lastName" label="Last Name" />
              </div>
            )}
            <InputField
              form={form}
              name="email"
              label="Email / Mobile"
              disabled={!!otpToken}
            />
            <div
              className={cn(
                "flex gap-4",
                formType !== "sign-up" ? "flex-col" : "items-center",
              )}
            >
              {(!formType.includes("password") || !!otpToken) && (
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
                  {}
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

            <form.Subscribe selector={(state) => state.canSubmit}>
              {(canSubmit) => (
                <Button
                  size="lg"
                  disabled={!canSubmit || isLoading}
                  type="submit"
                  className="capitalize"
                >
                  {formType === "sign-up"
                    ? " Create Account"
                    : formType === "sign-in"
                      ? "Login"
                      : !!otpToken
                        ? formType.split("-").join(" ")
                        : "Send Otp"}
                  {isLoading && <LoaderCircle className="animate-spin" />}
                </Button>
              )}
            </form.Subscribe>

            <SocialAuthField />
            <FieldDescription className="flex-center gap-2">
              {formType === "sign-up"
                ? "Already have an account?"
                : formType === "sign-in"
                  ? "Don't have an account?"
                  : "Back to Sign in"}
              <Link href={formType === "sign-in" ? "sign-up" : "sign-in"}>
                {formType === "sign-in" ? " Sign Up" : "Sign in"}
              </Link>
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
        setOtpToken={setOtpToken}
      />
      <FieldDescription className="px-6 text-center">
        By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
        and <a href="#">Privacy Policy</a>.
      </FieldDescription>
    </div>
  );
}

export default AuthForm;
