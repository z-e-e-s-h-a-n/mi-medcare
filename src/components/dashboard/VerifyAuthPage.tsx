"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { CircleCheckIcon, LoaderCircle, OctagonXIcon } from "lucide-react";
import { toast } from "sonner";
import { validateOtp, verifyChangeEmail } from "@lib/auth/client";
import { Card, CardContent } from "@components/ui/card";
import { cn } from "@lib/utils/general";

export interface VerifyAuthProps {
  email: string;
  newEmail?: string;
  purpose: OtpPurpose;
  secret: string;
  type?: OtpType;
}

function VerifyAuthPage({
  email,
  newEmail,
  purpose,
  secret,
  type,
}: VerifyAuthProps) {
  const router = useRouter();

  const [status, setStatus] = useState<"loading" | "success" | "error">(
    "loading",
  );

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
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
  }, [email, newEmail, purpose, router, secret, type]);

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

export default VerifyAuthPage;
