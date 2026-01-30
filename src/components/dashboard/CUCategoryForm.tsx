"use client";

import { GenericCUForm } from "@components/dashboard/GenericCUForm";
import { ComboboxField } from "@components/ui/combobox-field";
import { InputField } from "@components/ui/input-field";
import { useCategories, useCategory } from "@hooks/category";
import { CUCategorySchema } from "@schemas/category";

const CUCategoryForm = ({ formType, entityId }: BaseCUFormProps) => {
  return (
    <GenericCUForm
      entityName="Category"
      formType={formType}
      entityId={entityId}
      useQuery={useCategory}
      schema={CUCategorySchema}
      successRedirectPath="/categories"
      defaultValues={{
        name: "",
        slug: "",
        description: undefined,
      }}
    >
      {(form) => (
        <>
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
        </>
      )}
    </GenericCUForm>
  );
};

export default CUCategoryForm;
