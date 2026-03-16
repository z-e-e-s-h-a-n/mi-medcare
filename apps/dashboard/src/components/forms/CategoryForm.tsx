/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useForm } from "@tanstack/react-form";
import { FolderTree, Loader2 } from "lucide-react";

import {
  categoryPayloadSchema,
  type CategoryType,
} from "@workspace/contracts/content";
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

import { useCategory } from "@/hooks/content";
import CUFormSkeleton from "@/components/skeleton/CUFormSkeleton";

type CategoryFormProps = {
  entityId?: string;
  formType: "add" | "update";
};

const CategoryForm = ({ entityId, formType }: CategoryFormProps) => {
  const router = useRouter();
  const { data, mutateAsync, isPending, isLoading } = useCategory(entityId!);

  const form = useForm({
    defaultValues: {
      name: data?.name ?? "",
      slug: data?.slug ?? "",
      description: data?.description ?? undefined,
      parentId: data?.parentId ?? undefined,
    } as CategoryType,
    validators: {
      onSubmit: categoryPayloadSchema,
    },
    onSubmit: async ({ value }) => {
      try {
        await mutateAsync(value);
        toast.success(
          `Category ${formType === "add" ? "created" : "updated"} successfully.`,
        );
        router.push("/admin/content/categories");
      } catch (error: any) {
        toast.error(error?.message ?? "Failed to save category.");
      }
    },
  });

  if (isLoading) return <CUFormSkeleton />;

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold">
          {formType === "add" ? "New Category" : "Edit Category"}
        </h1>
        <p className="text-muted-foreground">
          Organize post content using reusable category records.
        </p>
      </div>

      <Form form={form}>
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
            <div className="grid gap-4 md:grid-cols-2">
              <InputField form={form} name="name" label="Name" />
              <InputField form={form} name="slug" label="Slug" />
            </div>

            <InputField
              form={form}
              name="description"
              label="Description"
              type="textarea"
              rows={4}
            />

            <InputField
              form={form}
              name="parentId"
              label="Parent Category Id"
              placeholder="Optional parent category id"
            />
          </CardContent>
        </Card>

        <div className="flex justify-between border-t pt-6">
          <Button
            type="button"
            variant="secondary"
            onClick={() => router.push("/admin/content/categories")}
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
              "Create Category"
            ) : (
              "Update Category"
            )}
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default CategoryForm;
