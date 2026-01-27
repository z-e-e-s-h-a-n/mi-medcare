import React from "react";
import { BaseFieldProps, FormField } from "./form";
import { Switch } from "./switch";

const SwitchField = <TFormData,>(props: BaseFieldProps<TFormData>) => {
  return (
    <FormField {...props} className="flex-row-reverse items-center">
      {({ isInvalid, ...field }) => (
        <Switch
          {...field}
          checked={field.value}
          aria-invalid={isInvalid}
          className="size-4!"
        />
      )}
    </FormField>
  );
};

export default SwitchField;
