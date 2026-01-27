"use client";

import { SimpleEditor } from "@/components/tiptap-templates/simple/simple-editor";
import { BaseFieldProps, FormField } from "../ui/form";

export const RichTextField = <TFormData,>({
  defaultValue,
  ...rest
}: BaseFieldProps<TFormData>) => {
  return (
    <FormField {...rest}>
      {(field) => {
        return <SimpleEditor {...field} defaultValue={defaultValue} />;
      }}
    </FormField>
  );
};
