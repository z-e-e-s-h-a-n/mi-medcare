"use client";

import type { BaseCUFormProps } from "@workspace/contracts";
import { GenericForm } from "../shared/GenericForm";
import { useTag } from "@/hooks/content";
import { InputField } from "@workspace/ui/components/input-field";
import { CUTagSchema } from "@workspace/contracts/content";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@workspace/ui/components/card";
import { Tags } from "lucide-react";

const CUCategoryForm = (props: BaseCUFormProps) => {
  return (
    <GenericForm
      {...props}
      entityName="Tag"
      useQuery={useTag}
      schema={CUTagSchema}
      defaultValues={{
        name: "",
        slug: "",
      }}
    >
      {(form) => (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Tags className="size-5" />
              Tag Details
            </CardTitle>
            <CardDescription>
              Keep tags short and consistent for filtering.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <InputField form={form} name="name" label="Name" />
              <InputField form={form} name="slug" label="Slug" />
            </div>
          </CardContent>
        </Card>
      )}
    </GenericForm>
  );
};

export default CUCategoryForm;
