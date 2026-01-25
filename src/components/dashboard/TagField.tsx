/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useRef, useState } from "react";
import { X } from "lucide-react";
import { Input } from "../ui/input";
import { Badge } from "../ui/badge";
import { Label } from "../ui/label";
import type { BaseFieldProps } from "../ui/form";
import { useTags } from "@hooks/tags";

const TagField = <TFormData,>({
  form,
  name,
  label,
  disabled,
}: BaseFieldProps<TFormData>) => {
  const { data } = useTags();

  const options = data?.tags ?? [];
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const normalize = (v: string) => v.trim().toLowerCase();

  return (
    <form.Field name={name} mode="array">
      {(field) => {
        const values: string[] = Array.isArray(field.state.value)
          ? field.state.value
          : [];

        const q = normalize(query);

        const filtered =
          q.length === 0
            ? []
            : options.filter(
                (t) =>
                  !values.includes(normalize(t.name)) &&
                  (t.name.toLowerCase().includes(q) ||
                    t.slug.toLowerCase().includes(q)),
              );

        const exactMatch = options.find(
          (t) => normalize(t.name) === normalize(query),
        );

        const isNew =
          query.length > 0 && !exactMatch && !values.includes(normalize(query));

        const addTag = (value: string) => {
          const tag = normalize(value);
          if (!tag || values.includes(tag)) return;
          field.pushValue(tag as any);
          setQuery("");
        };

        const removeTag = (index: number) => {
          field.removeValue(index);
        };

        return (
          <div className="space-y-2">
            <Label>{label}</Label>

            {/* Selected tags */}
            <div className="flex flex-wrap gap-2">
              {values.map((tag, i) => (
                <Badge key={tag} variant="secondary">
                  {tag}
                  <button
                    type="button"
                    className="ml-1"
                    onClick={() => removeTag(i)}
                  >
                    <X size={12} />
                  </button>
                </Badge>
              ))}
            </div>

            {/* Input */}
            <div className="relative">
              <Input
                ref={inputRef}
                value={query}
                disabled={disabled}
                placeholder="Type tag and press Enter"
                onChange={(e) => setQuery(e.target.value)}
                onBlur={() => {
                  setQuery("");
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === ",") {
                    e.preventDefault();
                    addTag(query);
                  }
                }}
              />

              {(filtered.length > 0 || isNew) && (
                <ul className="absolute top-full z-50 w-full rounded-md border bg-background shadow-md max-h-60 overflow-y-auto">
                  {/* Existing matches */}
                  {filtered.map((item) => (
                    <li
                      key={item.name}
                      className="cursor-pointer px-3 py-2 hover:bg-muted"
                      onMouseDown={() => addTag(item.name)}
                    >
                      {item.name}
                    </li>
                  ))}

                  {/* Add new */}
                  {isNew && (
                    <li
                      className="cursor-pointer px-3 py-2 text-sm text-muted-foreground hover:bg-muted"
                      onMouseDown={() => addTag(query)}
                    >
                      ➕ Add <b>&quot;{query}&quot;</b>
                      <span className="ml-2 opacity-70">(Press Enter)</span>
                    </li>
                  )}
                </ul>
              )}
            </div>
          </div>
        );
      }}
    </form.Field>
  );
};

export default TagField;
