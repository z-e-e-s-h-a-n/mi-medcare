/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { useForm } from "@tanstack/react-form";
import { FileText, ImagePlus, Loader2 } from "lucide-react";

import {
  postPayloadSchema,
  type PostType,
} from "@workspace/contracts/content";
import type { MediaResponse } from "@workspace/contracts/media";
import { ProductStatusEnum } from "@workspace/contracts";
import { Form } from "@workspace/ui/components/form";
import { Button } from "@workspace/ui/components/button";
import { InputField } from "@workspace/ui/components/input-field";
import { MultiSelectField, SelectField } from "@workspace/ui/components/select-field";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@workspace/ui/components/card";

import { useCategories, usePost, useTags } from "@/hooks/content";
import { useMediaLibrary } from "@/hooks/media";
import CUFormSkeleton from "@/components/skeleton/CUFormSkeleton";

type PostFormProps = {
  entityId?: string;
  formType: "add" | "update";
};

const emptyPost: PostType = {
  categoryId: "",
  title: "",
  slug: "",
  excerpt: "",
  content: "",
  coverId: undefined,
  tagIds: [],
  status: "draft",
  publishedAt: undefined,
  metaTitle: undefined,
  metaDescription: undefined,
  isFeatured: false,
};

const PostForm = ({ entityId, formType }: PostFormProps) => {
  const router = useRouter();
  const { onMediaSelect } = useMediaLibrary();
  const { data, mutateAsync, isPending, isLoading } = usePost(entityId!);
  const { data: categoryData } = useCategories({ page: 1, limit: 100 });
  const { data: tagData } = useTags({ page: 1, limit: 100 });
  const [cover, setCover] = useState<MediaResponse | undefined>(data?.cover);

  const categoryOptions = useMemo(
    () =>
      (categoryData?.categories ?? []).map((category) => ({
        label: category.name,
        value: category.id,
      })),
    [categoryData],
  );

  const tagOptions = useMemo(
    () =>
      (tagData?.tags ?? []).map((tag) => ({
        label: tag.name,
        value: tag.id,
      })),
    [tagData],
  );

  const form = useForm({
    defaultValues: {
      ...emptyPost,
      ...data,
      categoryId: data?.categoryId ?? "",
      tagIds: data?.tags?.map((tag) => tag.id) ?? [],
      coverId: data?.coverId ?? undefined,
      publishedAt: data?.publishedAt ?? undefined,
      isFeatured: data?.isFeatured ?? false,
    } as any,
    validators: {
      onSubmit: postPayloadSchema as any,
    },
    onSubmit: async ({ value }) => {
      try {
        await mutateAsync({
          ...value,
          coverId: cover?.id ?? undefined,
          publishedAt: value.publishedAt || undefined,
        });
        toast.success(
          `Post ${formType === "add" ? "created" : "updated"} successfully.`,
        );
        router.push("/admin/content/posts");
      } catch (error: any) {
        toast.error(error?.message ?? "Failed to save post.");
      }
    },
  });

  useEffect(() => {
    if (!data) return;
    setCover(data.cover);
  }, [data]);

  if (isLoading) return <CUFormSkeleton />;

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold">
          {formType === "add" ? "New Post" : "Edit Post"}
        </h1>
        <p className="text-muted-foreground">
          Create editorial content connected to categories and tags.
        </p>
      </div>

      <Form form={form}>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="size-5" />
              Post Content
            </CardTitle>
            <CardDescription>
              Core post details, taxonomy, and publishing state.
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

            <InputField
              form={form}
              name="content"
              label="Content"
              type="textarea"
              rows={12}
            />

            <div className="grid gap-4 md:grid-cols-2">
              <SelectField
                form={form}
                name="categoryId"
                label="Category"
                options={categoryOptions}
              />
              <SelectField
                form={form}
                name="status"
                label="Status"
                options={ProductStatusEnum.options}
              />
            </div>

            <MultiSelectField
              form={form}
              name="tagIds"
              label="Tags"
              options={tagOptions}
            />

            <div className="grid gap-4 md:grid-cols-2">
              <InputField
                form={form}
                name="publishedAt"
                label="Published At (ISO)"
                placeholder="2026-03-16T12:00:00.000Z"
              />
              <InputField
                form={form}
                name="isFeatured"
                label="Featured Post"
                type="checkbox"
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Cover & SEO</CardTitle>
            <CardDescription>
              Choose an optional cover image and metadata.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="rounded-xl border p-4 space-y-4">
              <div className="space-y-1">
                <p className="font-medium">Cover Image</p>
                <p className="text-sm text-muted-foreground">
                  Hero image used in cards and post headers.
                </p>
              </div>

              <div className="aspect-video rounded-lg border bg-muted/30 overflow-hidden flex items-center justify-center">
                {cover?.url ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={cover.url}
                    alt={cover.altText || cover.title || "Post cover"}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="flex flex-col items-center gap-2 text-muted-foreground">
                    <ImagePlus className="size-5" />
                    <span className="text-sm">No media selected</span>
                  </div>
                )}
              </div>

              <Button
                variant="secondary"
                className="w-full"
                onClick={() =>
                  onMediaSelect((media) => {
                    setCover(media);
                    form.setFieldValue("coverId", media.id);
                  })
                }
              >
                Select Cover
              </Button>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <InputField form={form} name="metaTitle" label="Meta Title" />
              <InputField
                form={form}
                name="metaDescription"
                label="Meta Description"
                type="textarea"
                rows={4}
              />
            </div>
          </CardContent>

          <CardFooter className="justify-between">
            <Button
              type="button"
              variant="secondary"
              onClick={() => router.push("/admin/content/posts")}
              disabled={isPending}
            >
              Cancel
            </Button>

            <Button type="submit" disabled={isPending}>
              {isPending ? (
                <>
                  <Loader2 className="mr-2 size-4 animate-spin" />
                  Saving
                </>
              ) : formType === "add" ? (
                "Create Post"
              ) : (
                "Update Post"
              )}
            </Button>
          </CardFooter>
        </Card>
      </Form>
    </div>
  );
};

export default PostForm;
