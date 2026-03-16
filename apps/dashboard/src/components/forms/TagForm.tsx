/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useForm } from "@tanstack/react-form";
import { Loader2, Tags } from "lucide-react";

import { tagPayloadSchema, type TagType } from "@workspace/contracts/content";
import { Form } from "@workspace/ui/components/form";
import { Button } from "@workspace/ui/components/button";
import { InputField } from "@workspace/ui/components/input-field";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@workspace/ui/components/card";

import { useTag } from "@/hooks/content";
import CUFormSkeleton from "@/components/skeleton/CUFormSkeleton";

type TagFormProps = {
  entityId?: string;
  formType: "add" | "update";
};

const TagForm = ({ entityId, formType }: TagFormProps) => {
  const router = useRouter();
  const { data, mutateAsync, isPending, isLoading } = useTag(entityId!);

  const form = useForm({
    defaultValues: {
      name: data?.name ?? "",
      slug: data?.slug ?? "",
    } as TagType,
    validators: {
      onSubmit: tagPayloadSchema,
    },
    onSubmit: async ({ value }) => {
      try {
        await mutateAsync(value);
        toast.success(
          `Tag ${formType === "add" ? "created" : "updated"} successfully.`,
        );
        router.push("/admin/content/tags");
      } catch (error: any) {
        toast.error(error?.message ?? "Failed to save tag.");
      }
    },
  });

  if (isLoading) return <CUFormSkeleton />;

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold">
          {formType === "add" ? "New Tag" : "Edit Tag"}
        </h1>
        <p className="text-muted-foreground">
          Define reusable content labels for posts.
        </p>
      </div>

      <Form form={form}>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Tags className="size-5" />
              Tag Details
            </CardTitle>
            <CardDescription>
              Keep tags short and consistent for filtering.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <InputField form={form} name="name" label="Name" />
              <InputField form={form} name="slug" label="Slug" />
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-between border-t pt-6">
          <Button
            type="button"
            variant="secondary"
            onClick={() => router.push("/admin/content/tags")}
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
              "Create Tag"
            ) : (
              "Update Tag"
            )}
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default TagForm;
