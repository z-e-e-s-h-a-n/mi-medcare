/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useForm } from "@tanstack/react-form";
import { Loader2, MessageSquareReply } from "lucide-react";

import {
  updateContactMessageSchema,
  type UpdateContactMessageType,
} from "@workspace/contracts/contact";
import { ContactMessageStatusEnum } from "@workspace/contracts";
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

import { useContactMessage } from "@/hooks/lead";
import CUFormSkeleton from "@/components/skeleton/CUFormSkeleton";

type ContactReplyFormProps = {
  entityId: string;
};

const ContactReplyForm = ({ entityId }: ContactReplyFormProps) => {
  const router = useRouter();
  const { data, mutateAsync, isPending, isLoading } = useContactMessage(entityId);

  const form = useForm({
    defaultValues: {
      notes: data?.notes ?? undefined,
      status: data?.status ?? "pending",
    } as UpdateContactMessageType,
    validators: {
      onSubmit: updateContactMessageSchema,
    },
    onSubmit: async ({ value }) => {
      try {
        await mutateAsync(value);
        toast.success("Contact message updated successfully.");
        router.push(`/admin/leads/contact/${entityId}`);
      } catch (error: any) {
        toast.error(error?.message ?? "Failed to update contact message.");
      }
    },
  });

  if (isLoading) return <CUFormSkeleton />;

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Reply Contact Message</h1>
        <p className="text-muted-foreground">
          Update the message status and add internal notes.
        </p>
      </div>

      <Form form={form}>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageSquareReply className="size-5" />
              Response Details
            </CardTitle>
            <CardDescription>
              Mark review progress and store reply notes.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <SelectField
              form={form}
              name="status"
              label="Status"
              options={ContactMessageStatusEnum.options}
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
            onClick={() => router.push(`/admin/leads/contact/${entityId}`)}
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
              "Save Reply"
            )}
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default ContactReplyForm;
