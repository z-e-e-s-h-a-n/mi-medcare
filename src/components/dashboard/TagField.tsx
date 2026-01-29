/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
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
  useComboboxAnchor,
} from "@components/ui/combobox";

import type { BaseFieldProps } from "@components/ui/form";
import { useTags } from "@hooks/tags";
import { Field, FieldError, FieldLabel } from "@components/ui/field";
import React from "react";

interface TagFieldProps<TFormData> extends BaseFieldProps<TFormData> {
  defaultValue?: TagResponse[];
}

const TagField = <TFormData,>({
  form,
  name,
  label,
  disabled,
  defaultValue = [],
}: TagFieldProps<TFormData>) => {
  const { data } = useTags();

  const options = React.useMemo(() => {
    const fetchedTags = data?.tags ?? [];

    const combined = [...defaultValue, ...fetchedTags];

    const uniqueTags = combined.filter(
      (tag, index, self) => self.findIndex((t) => t.id === tag.id) === index,
    );

    return uniqueTags;
  }, [data?.tags, defaultValue]);

  console.log("options", options);
  console.log("data.tags", data?.tags);

  const anchor = useComboboxAnchor();

  return (
    <form.Field name={name} mode="array">
      {(field) => {
        const isInvalid =
          field.state.meta.isTouched && !field.state.meta.isValid;

        const values: TagResponse[] = Array.isArray(field.state.value)
          ? field.state.value
          : [];

        return (
          <Field data-invalid={isInvalid}>
            <FieldLabel
              className="w-full flex items-center justify-between"
              htmlFor={field.name}
            >
              {label}
            </FieldLabel>

            <Combobox
              items={options}
              multiple
              value={values}
              defaultValue={values}
              onValueChange={(v) => {
                field.handleChange(v as any);
              }}
              disabled={disabled}
            >
              <ComboboxChips ref={anchor} className="w-full">
                <ComboboxValue>
                  {values.map((v) => (
                    <ComboboxChip key={v.id}>{v.name}</ComboboxChip>
                  ))}
                </ComboboxValue>
                <ComboboxChipsInput placeholder="Add framework" />
              </ComboboxChips>

              <ComboboxContent anchor={anchor}>
                <ComboboxEmpty>No items found.</ComboboxEmpty>
                <ComboboxList>
                  {(item: TagResponse) => (
                    <ComboboxItem key={item.id} value={item}>
                      {item.name}
                    </ComboboxItem>
                  )}
                </ComboboxList>
              </ComboboxContent>
            </Combobox>
            {isInvalid && <FieldError errors={[field.state.meta.errors[0]]} />}
          </Field>
        );
      }}
    </form.Field>
  );
};

export default TagField;
