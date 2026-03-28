"use client";

import type { BaseCUFormProps } from "@workspace/contracts";
import { GenericForm } from "@workspace/ui/shared/GenericForm";
import { useCategories, useCategory } from "@/hooks/content";
import { InputField } from "@workspace/ui/components/input-field";
import { ComboboxField } from "@workspace/ui/components/combobox-field";
import { CUCategorySchema } from "@workspace/contracts/content";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@workspace/ui/components/card";
import { FolderTree } from "lucide-react";

const CUCategoryForm = (props: BaseCUFormProps) => {
  return (
    <GenericForm
      {...props}
      entityName="Category"
      useQuery={useCategory}
      schema={CUCategorySchema}
      defaultValues={{
        name: "",
        slug: "",
      }}
    >
      {(form) => (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FolderTree className="size-5" />
              Category Details
            </CardTitle>
            <CardDescription>
              Slug and hierarchy settings used by posts.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <InputField form={form} name="name" label="Name" />
              <ComboboxField
                form={form}
                name="parentId"
                label="Parent"
                dataKey="categories"
                useQuery={useCategories}
                getOption={(c) => ({
                  key: c.name,
                  value: c.id,
                  label: c.name,
                  content: (
                    <div>
                      <span>{c.name}</span>
                      <p className="max-w-full truncate">{c.description}</p>
                    </div>
                  ),
                })}
              />
            </div>
            <InputField form={form} name="slug" label="Slug" />
            <InputField
              form={form}
              name="description"
              label="Description"
              type="textarea"
            />
          </CardContent>
        </Card>
      )}
    </GenericForm>
  );
};

export default CUCategoryForm;
