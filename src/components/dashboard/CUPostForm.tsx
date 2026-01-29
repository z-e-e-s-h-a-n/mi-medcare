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
import { slugify } from "@utils/general";

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
        tags: [],
        content: "",
        categoryId: "",
        coverId: "",
        excerpt: "",
        status: "draft",
        metaTitle: undefined,
        metaDescription: undefined,
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
          <form.Subscribe selector={(state) => ({ title: state.values.title })}>
            {({ title }) => {
              const slug = slugify(title);
              if (title) form.setFieldValue("slug", slug);
              return <InputField form={form} name="slug" label="Slug" />;
            }}
          </form.Subscribe>
          <InputField form={form} name="excerpt" label="Excerpt" />
          <TagField
            form={form}
            name="tags"
            label="Tags"
            defaultValue={data?.tags}
          />
          <MediaField
            form={form}
            name="coverId"
            label="Cover Image"
            defaultMedia={data?.cover}
          />
          <RichTextField form={form} name="content" label="Content" />
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
