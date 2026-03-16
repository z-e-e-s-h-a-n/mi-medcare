"use client";

import { MessageSquareReply } from "lucide-react";

import { updateContactMessageSchema } from "@workspace/contracts/contact";
import {
  ContactMessageStatusEnum,
  type BaseCUFormProps,
} from "@workspace/contracts";
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
import { GenericForm } from "../shared/GenericForm";

const ContactReplyForm = (props: BaseCUFormProps) => {
  return (
    <GenericForm
      {...props}
      entityName="Message"
      description="Update the message status and add internal notes."
      useQuery={useContactMessage}
      schema={updateContactMessageSchema}
      defaultValues={{
        status: "pending",
      }}
    >
      {(form) => (
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
      )}
    </GenericForm>
  );
};

export default ContactReplyForm;
