/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "@tanstack/react-form";
import { FileText, ImagePlus, Loader2 } from "lucide-react";

import {
  pagePayloadSchema,
  type PageResponse,
  type PageType,
} from "@workspace/contracts/content";
import type { MediaResponse } from "@workspace/contracts/media";
import { ProductStatusEnum } from "@workspace/contracts";
import { Form } from "@workspace/ui/components/form";
import { Button } from "@workspace/ui/components/button";
import { InputField } from "@workspace/ui/components/input-field";
import { SelectField } from "@workspace/ui/components/select-field";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@workspace/ui/components/card";

import { usePage } from "@/hooks/content";
import { useMediaLibrary } from "@/hooks/media";
import CUFormSkeleton from "@/components/skeleton/CUFormSkeleton";

type PageFormProps = {
  entityId?: string;
  formType: "add" | "update";
};

const emptyPage: PageType = {
  title: "",
  slug: "",
  content: "",
  coverId: undefined,
  metaTitle: undefined,
  metaDescription: undefined,
  status: "draft",
  publishedAt: undefined,
};

const PageForm = ({ entityId, formType }: PageFormProps) => {
  const router = useRouter();
  const { onMediaSelect } = useMediaLibrary();
  const { data, mutateAsync, isPending, isLoading } = usePage(entityId!);
  const [cover, setCover] = useState<MediaResponse | undefined>(data?.cover);

  const form = useForm({
    defaultValues: {
      ...emptyPage,
      ...data,
      publishedAt: data?.publishedAt ?? undefined,
      coverId: data?.coverId ?? undefined,
    } as any,
    validators: {
      onSubmit: pagePayloadSchema as any,
    },
    onSubmit: async ({ value }) => {
      try {
        await mutateAsync({
          ...value,
          coverId: cover?.id ?? undefined,
          publishedAt: value.publishedAt || undefined,
        });
        toast.success(
          `Page ${formType === "add" ? "created" : "updated"} successfully.`,
        );
        router.push("/admin/content/pages");
      } catch (error: any) {
        toast.error(error?.message ?? "Failed to save page.");
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
          {formType === "add" ? "New Page" : "Edit Page"}
        </h1>
        <p className="text-muted-foreground">
          Manage standalone website pages and informational content.
        </p>
      </div>

      <Form form={form}>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="size-5" />
              Page Content
            </CardTitle>
            <CardDescription>
              Main page fields and publishing status.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <InputField form={form} name="title" label="Title" />
              <InputField form={form} name="slug" label="Slug" />
            </div>

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
                name="status"
                label="Status"
                options={ProductStatusEnum.options}
              />
              <InputField
                form={form}
                name="publishedAt"
                label="Published At (ISO)"
                placeholder="2026-03-16T12:00:00.000Z"
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Cover & SEO</CardTitle>
            <CardDescription>
              Choose an optional cover and configure metadata.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="rounded-xl border p-4 space-y-4">
              <div className="space-y-1">
                <p className="font-medium">Cover Image</p>
                <p className="text-sm text-muted-foreground">
                  Optional media shown with this page.
                </p>
              </div>

              <div className="aspect-video rounded-lg border bg-muted/30 overflow-hidden flex items-center justify-center">
                {cover?.url ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={cover.url}
                    alt={cover.altText || cover.title || "Page cover"}
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
              onClick={() => router.push("/admin/content/pages")}
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
                "Create Page"
              ) : (
                "Update Page"
              )}
            </Button>
          </CardFooter>
        </Card>
      </Form>
    </div>
  );
};

export default PageForm;
