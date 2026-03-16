/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useForm } from "@tanstack/react-form";
import { ClipboardList, Loader2 } from "lucide-react";

import {
  updateConsultationRequestSchema,
  type UpdateConsultationRequestType,
} from "@workspace/contracts/consultation";
import { ConsultationRequestStatusEnum } from "@workspace/contracts";
import { Form } from "@workspace/ui/components/form";
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

import { useConsultationRequest } from "@/hooks/lead";
import CUFormSkeleton from "@/components/skeleton/CUFormSkeleton";

type ConsultationRequestFormProps = {
  entityId: string;
};

const ConsultationRequestForm = ({
  entityId,
}: ConsultationRequestFormProps) => {
  const router = useRouter();
  const { data, mutateAsync, isPending, isLoading } =
    useConsultationRequest(entityId);

  const form = useForm({
    defaultValues: {
      notes: data?.notes ?? undefined,
      status: data?.status ?? "new",
    } as UpdateConsultationRequestType,
    validators: {
      onSubmit: updateConsultationRequestSchema,
    },
    onSubmit: async ({ value }) => {
      try {
        await mutateAsync(value);
        toast.success("Consultation request updated successfully.");
        router.push(`/admin/leads/consultation/${entityId}`);
      } catch (error: any) {
        toast.error(error?.message ?? "Failed to update consultation request.");
      }
    },
  });

  if (isLoading) return <CUFormSkeleton />;

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Update Consultation Request</h1>
        <p className="text-muted-foreground">
          Track qualification progress and internal notes.
        </p>
      </div>

      <Form form={form}>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ClipboardList className="size-5" />
              Request Status
            </CardTitle>
            <CardDescription>
              Update current progress and store your notes.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <SelectField
              form={form}
              name="status"
              label="Status"
              options={ConsultationRequestStatusEnum.options}
            />
            <InputField
              form={form}
              name="notes"
              label="Notes"
              type="textarea"
              rows={8}
            />
          </CardContent>
        </Card>

        <div className="flex justify-between border-t pt-6">
          <Button
            type="button"
            variant="secondary"
            onClick={() => router.push(`/admin/leads/consultation/${entityId}`)}
            disabled={isPending}
          >
            Cancel
          </Button>

          <Button type="submit" disabled={isPending}>
            {isPending ? (
              <>
                <Loader2 className="mr-2 size-4 animate-spin" />
                Saving
              </>
            ) : (
              "Save Changes"
            )}
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default ConsultationRequestForm;
