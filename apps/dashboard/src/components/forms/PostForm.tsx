"use client";

import { GenericForm } from "@workspace/ui/shared/GenericForm";
import { PostStatusEnum, type BaseCUFormProps } from "@workspace/contracts";
import { useCategories, usePost, useTags } from "@/hooks/content";
import { CUPostSchema } from "@workspace/contracts/content";
import { InputField } from "@workspace/ui/components/input-field";
import { ComboboxField } from "@workspace/ui/components/combobox-field";
import { SelectField } from "@workspace/ui/components/select-field";
import { MediaField } from "@workspace/ui/media/mediaField";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@workspace/ui/components/card";
import { FileText } from "lucide-react";
import { DatePickerField } from "@workspace/ui/components/date-field";
import { RichTextField } from "@workspace/ui/components/rich-field";

const CUPostForm = (props: BaseCUFormProps) => {
  return (
    <GenericForm
      {...props}
      entityName="Post"
      useQuery={usePost}
      schema={CUPostSchema}
      defaultValues={{
        title: "",
        slug: "",
        tagIds: [],
        content: "",
        categoryId: "",
        coverId: "",
        excerpt: "",
        status: "draft",
      }}
      mapDataToValues={(d) => ({
        ...d,
        tagIds: d.tags.map((t) => t.id),
      })}
    >
      {(form, _, data) => {
        const tagsIds = data?.tags.map((t) => t.id);

        return (
          <>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="size-5" />
                  Post Preview
                </CardTitle>
                <CardDescription>
                  Main identity and how the post appears in listings.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <InputField form={form} name="title" label="Title" />
                  <InputField form={form} name="slug" label="Slug" />
                </div>

                <InputField
                  form={form}
                  name="excerpt"
                  label="Excerpt"
                  type="textarea"
                  rows={4}
                />

                <RichTextField form={form} name="content" label="Content" />

                <MediaField
                  form={form}
                  name="coverId"
                  label="Cover Image"
                  defaultMedia={data?.cover}
                />
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Publishing</CardTitle>
                <CardDescription>
                  Organization and publishing settings.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <ComboboxField
                    form={form}
                    name="categoryId"
                    label="Category"
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

                  <SelectField
                    form={form}
                    name="status"
                    label="Status"
                    options={PostStatusEnum.options}
                  />
                </div>

                <ComboboxField
                  form={form}
                  name="tagIds"
                  label="Tags"
                  multiple
                  dataKey="tags"
                  useQuery={useTags}
                  queryArgs={{ includeIds: tagsIds }}
                  getOption={(t) => ({
                    key: t.name,
                    label: t.name,
                    value: t.id,
                    content: (
                      <div>
                        <span>{t.name}</span>
                      </div>
                    ),
                  })}
                />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>SEO</CardTitle>
                <CardDescription>
                  Optional metadata for search and sharing.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <InputField form={form} name="metaTitle" label="Meta Title" />
                  <DatePickerField
                    form={form}
                    name="publishedAt"
                    label="Published At"
                  />
                </div>
                <InputField
                  form={form}
                  name="metaDescription"
                  label="Meta Description"
                  type="textarea"
                  rows={4}
                />
              </CardContent>
            </Card>
          </>
        );
      }}
    </GenericForm>
  );
};

export default CUPostForm;
