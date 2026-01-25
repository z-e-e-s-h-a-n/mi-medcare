"use client";

import React from "react";
import { GenericCUForm } from "./GenericCUForm";
import { CUPostSchema } from "@schemas/post";
import { usePost } from "@hooks/post";
import { ComboboxField } from "../ui/combobox-field";
import { useCategories } from "@hooks/category";
import { InputField } from "../ui/input-field";
import { SelectField } from "../ui/select-field";
import { MediaField } from "../ui/media-field";
import { PostStatusEnum } from "@schemas/enums";
import TagField from "./TagField";
import { RichTextField } from "./RichTextField";

const CUPostForm = ({ formType, entityId }: BaseCUFormProps) => {
  return (
    <GenericCUForm
      entityName="Post"
      formType={formType}
      entityId={entityId}
      useQuery={usePost}
      schema={CUPostSchema}
      successRedirectPath="/posts"
      defaultValues={{
        title: "",
        slug: "",
        content: "",
        status: "draft",
      }}
    >
      {(form, _, data) => (
        <>
          <div className="flex items-center gap-4">
            <InputField form={form} name="title" label="Title" />
            <ComboboxField
              form={form}
              name="categoryId"
              label="Category"
              dataKey="categories"
              useQuery={useCategories}
              getOption={(c) => ({
                key: c.name,
                value: c.name,
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
          <InputField form={form} name="excerpt" label="Excerpt" />
          <div className="min-w-0 max-w-full overflow-x-auto"></div>
          <RichTextField form={form} name="content" label="Content" />
          <MediaField
            form={form}
            name="coverImage"
            label="Cover Image"
            accept="image/*"
            maxSize={5 * 1024 * 1024}
            defaultMedia={data?.cover}
          />
          <TagField form={form} name="tags" label="Tags" />
          <SelectField
            form={form}
            name="status"
            label="Status"
            options={PostStatusEnum.options}
          />
          <InputField form={form} name="metaTitle" label="Meta Title" />
          <InputField
            form={form}
            name="metaDescription"
            label="Meta Description"
            type="textarea"
          />
        </>
      )}
    </GenericCUForm>
  );
};

export default CUPostForm;
