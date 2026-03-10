import { FormField, type BaseFieldProps } from "./form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./select";
import {
  Combobox,
  ComboboxChip,
  ComboboxChips,
  ComboboxChipsInput,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxItem,
  ComboboxList,
  ComboboxValue,
} from "./combobox";
import React from "react";

interface MultiSelectFieldProps<TFormData> extends BaseFieldProps<TFormData> {
  options: { label: string; value: string }[];
}

export function MultiSelectField<TFormData>({
  options,
  ...props
}: MultiSelectFieldProps<TFormData>) {
  const items = React.useMemo(() => options.map((o) => o.value), [options]);

  const labelMap = React.useMemo(
    () => Object.fromEntries(options.map((o) => [o.value, o.label])),
    [options],
  );

  return (
    <FormField {...props}>
      {({ isInvalid, ...field }) => (
        <Combobox
          name={field.name}
          multiple
          autoHighlight
          items={items}
          value={field.value}
          onValueChange={field.onChange}
          disabled={field.disabled}
        >
          <ComboboxChips>
            <ComboboxValue>
              {field.value.map((v: string) => (
                <ComboboxChip key={v}>{labelMap[v]}</ComboboxChip>
              ))}
            </ComboboxValue>

            <ComboboxChipsInput
              placeholder={field.placeholder}
              aria-invalid={isInvalid}
            />
          </ComboboxChips>

          <ComboboxContent>
            <ComboboxEmpty>No items found.</ComboboxEmpty>
            <ComboboxList>
              {(value) => (
                <ComboboxItem key={value} value={value}>
                  {labelMap[value]}
                </ComboboxItem>
              )}
            </ComboboxList>
          </ComboboxContent>
        </Combobox>
      )}
    </FormField>
  );
}

interface SelectFieldProps<TFormData> extends BaseFieldProps<TFormData> {
  options: string[] | { label: string; value: string }[];
}

export const SelectField = <TFormData,>({
  options,
  disabled,
  ...props
}: SelectFieldProps<TFormData>) => {
  return (
    <FormField {...props}>
      {({ isInvalid, ...field }) => {
        const normalizedOptions = options.map((option) =>
          typeof option === "string"
            ? { label: option, value: option }
            : option,
        );

        const value = field.value ?? "";

        const selectedLabel =
          normalizedOptions.find((o) => o.value === value)?.label ?? value;

        return (
          <Select
            name={field.name}
            value={value}
            onValueChange={field.onChange}
            disabled={disabled}
          >
            <SelectTrigger
              id={field.name}
              aria-invalid={isInvalid}
              className="w-full capitalize"
            >
              <SelectValue placeholder={field.placeholder}>
                {selectedLabel || field.placeholder}
              </SelectValue>
            </SelectTrigger>

            <SelectContent position="popper">
              {normalizedOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        );
      }}
    </FormField>
  );
};
