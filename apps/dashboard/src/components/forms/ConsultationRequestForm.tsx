"use client";

import { ClipboardList } from "lucide-react";

import { updateConsultationRequestSchema } from "@workspace/contracts/consultation";
import {
  ConsultationRequestStatusEnum,
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

import { useConsultationRequest } from "@/hooks/lead";
import { GenericForm } from "@workspace/ui/shared/GenericForm";

const ConsultationRequestForm = (props: BaseCUFormProps) => {
  return (
    <GenericForm
      {...props}
      entityName="Request"
      description="Track qualification progress and internal notes."
      useQuery={useConsultationRequest}
      schema={updateConsultationRequestSchema}
      defaultValues={{
        status: "new",
      }}
    >
      {(form) => (
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
      )}
    </GenericForm>
  );
};

export default ConsultationRequestForm;
