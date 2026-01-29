"use client";

import { SimpleEditor } from "@/components/tiptap-templates/simple/simple-editor";
import { BaseFieldProps, FormField } from "../ui/form";

export const RichTextField = <TFormData,>(props: BaseFieldProps<TFormData>) => {
  return (
    <FormField {...props}>
      {(field) => {
        return <SimpleEditor {...field} />;
      }}
    </FormField>
  );
};
