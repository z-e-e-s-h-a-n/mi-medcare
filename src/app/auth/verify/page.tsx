/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter, notFound } from "next/navigation";
import { CircleCheckIcon, LoaderCircle, OctagonXIcon } from "lucide-react";
import { toast } from "sonner";
import { validateOtp, verifyChangeEmail } from "@lib/auth/client";
import { Card, CardContent } from "@components/ui/card";
import { cn } from "@lib/utils/general";

export default function VerifyPage() {
  const params = useSearchParams();
  const router = useRouter();

  const [status, setStatus] = useState<"loading" | "success" | "error">(
    "loading",
  );

  const email = params.get("email");
  const newEmail = params.get("newEmail");
  const purpose = params.get("purpose") as OtpPurpose;
  const secret = params.get("secret");
  const type = params.get("type") as OtpType;

  if (!email || !purpose || !secret) {
    notFound();
  } else if (!["verifyEmail", "changeEmail"].includes(purpose)) {
    toast.error("Invalid Purpose");
    router.push("/auth/sign-in");
  }

  const Icon =
    status === "success"
      ? CircleCheckIcon
      : status === "error"
        ? OctagonXIcon
        : LoaderCircle;

  useEffect(() => {
    const verify = async () => {
      try {
        let res;
        if (purpose === "changeEmail" && newEmail) {
          res = await verifyChangeEmail({
            email,
            newEmail,
            purpose,
            secret,
            type,
          });
        } else {
          res = await validateOtp({
            email,
            purpose,
            secret,
            type,
          });
        }

        toast.success(res.message);
        setStatus("success");

        setTimeout(() => {
          router.push("/auth/sign-in");
        }, 500);
      } catch (err: any) {
        toast.error("Verification failed", {
          description: err?.message,
        });
        setStatus("error");
        setTimeout(() => {
          router.push("/auth/sign-in");
        }, 500);
      }
    };

    verify();
  }, [email, newEmail, params, purpose, router, secret, type]);

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardContent
        className={cn(
          "flex-center flex-col gap-4 py-10",
          status === "success" && "text-green-500",
          status === "error" && "text-destructive",
        )}
      >
        <Icon
          className={cn("size-8", status === "loading" && "animate-spin")}
        />
        <div className={cn("flex-center gap-2")}>
          {status === "success"
            ? "Verification successful. Redirecting…"
            : status === "error"
              ? "This verification link is invalid or expired. Redirecting…"
              : "Verifying your request…"}
        </div>
      </CardContent>
    </Card>
  );
}
