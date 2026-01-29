"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { CircleCheckIcon, LoaderCircle, OctagonXIcon } from "lucide-react";
import { toast } from "sonner";
import { validateOtp, verifyChangeEmail } from "@lib/auth/client";
import { Card, CardContent } from "@components/ui/card";
import { cn } from "@lib/utils/general";

type VerificationStatus = "loading" | "success" | "error" | "oauth_success";
const VALID_PURPOSES = new Set(["verifyEmail", "changeEmail", "oauthSuccess"]);

export interface VerifyAuthProps {
  email: string;
  newEmail?: string;
  purpose: OtpPurpose | "oauthSuccess";
  secret: string;
  type?: OtpType;
  redirectUrl?: string;
}

function VerifyAuthPage({
  email,
  newEmail,
  purpose,
  secret,
  type,
  redirectUrl,
}: VerifyAuthProps) {
  const router = useRouter();
  const [status, setStatus] = useState<VerificationStatus>("loading");

  useEffect(() => {
    if (!VALID_PURPOSES.has(purpose as string)) {
      toast.error("Invalid verification purpose");
      router.replace("/auth/sign-in");
    }
  }, [purpose, router]);

  useEffect(() => {
    if (purpose !== "oauthSuccess") return;

    // eslint-disable-next-line react-hooks/set-state-in-effect
    setStatus("oauth_success");

    const timer = setTimeout(() => {
      router.replace(redirectUrl ?? "/dashboard");
    }, 1200);

    return () => clearTimeout(timer);
  }, [purpose, redirectUrl, router]);

  useEffect(() => {
    if (purpose === "oauthSuccess") return;

    const verify = async () => {
      try {
        const isChangeEmail = purpose === "changeEmail" && newEmail;

        const res = isChangeEmail
          ? await verifyChangeEmail({ email, newEmail, purpose, secret, type })
          : await validateOtp({ email, purpose, secret, type });

        toast.success(res.message);
        setStatus("success");

        setTimeout(() => {
          router.replace("/auth/sign-in");
        }, 1200);
      } catch {
        toast.error("Verification failed");
        setStatus("error");

        setTimeout(() => {
          router.replace("/auth/sign-in");
        }, 1200);
      }
    };

    verify();
  }, [email, newEmail, purpose, secret, type, router]);

  const StatusConfig = {
    loading: {
      icon: LoaderCircle,
      message: "Verifying your request…",
      className: "",
    },
    success: {
      icon: CircleCheckIcon,
      message: "Verification successful. Redirecting…",
      className: "text-green-500",
    },
    error: {
      icon: OctagonXIcon,
      message: "This verification link is invalid or expired. Redirecting…",
      className: "text-destructive",
    },
    oauth_success: {
      icon: CircleCheckIcon,
      message: "Authentication successful. Redirecting…",
      className: "text-green-500",
    },
  } as const;

  const { icon: Icon, message, className } = StatusConfig[status];

  return (
    <Card className="mx-auto w-full max-w-md">
      <CardContent
        className={cn("flex-center flex-col gap-4 py-10", className)}
      >
        <Icon
          className={cn("size-8", status === "loading" && "animate-spin")}
        />
        <p className="text-center">{message}</p>
      </CardContent>
    </Card>
  );
}

export default VerifyAuthPage;
