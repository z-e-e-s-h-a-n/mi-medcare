"use client";

import { useForm, type FormValidateOrFn } from "@tanstack/react-form";
import { Form, type AnyFormApi } from "@components/ui/form";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import CUFormSkeleton from "../skeleton/CUFormSkeleton";
import { ApiException } from "@lib/http/http-exception";

interface UseQueryResult<TData, TFormData> {
  data?: TData;
  isLoading?: boolean;
  fetchError: ApiException | null;
  mutateAsync: (data: TFormData) => Promise<TData>;
  isPending: boolean;
  mutateError: ApiException | null;
}

interface GenericCUFormProps<TData, TFormData> extends BaseCUFormProps {
  entityName: string;
  defaultValues?: Partial<TFormData>;
  schema: FormValidateOrFn<TFormData>;
  useQuery: (entityId?: string) => UseQueryResult<TData, TFormData>;
  successRedirectPath: string;
  children: (
    form: AnyFormApi<TFormData>,
    formType: FormSectionType,
    data?: TData,
  ) => React.ReactNode;
}

export function GenericCUForm<TData, TFormData>({
  entityId,
  entityName,
  formType,
  children,
  defaultValues,
  schema,
  useQuery,
  successRedirectPath,
}: GenericCUFormProps<TData, TFormData>) {
  const router = useRouter();
  const { data, mutateAsync, isLoading, isPending } = useQuery(entityId);

  const initialValues: TFormData = {
    ...defaultValues,
    ...data,
  } as TFormData;

  const form = useForm({
    defaultValues: initialValues,
    validators: {
      onSubmit: schema,
    },
    onSubmit: async ({ value }) => {
      try {
        await mutateAsync(value);
        toast.success(
          `${entityName} ${entityId ? "updated" : "created"} successfully!`,
        );
        router.push(`/dashboard${successRedirectPath}`);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (err: any) {
        toast.error(err?.message ?? "Something went wrong.");
      }
    },
  });

  if (isLoading) return <CUFormSkeleton />;

  return (
    <Form
      form={form}
      isPending={isPending}
      title={
        <>
          {formType === "add" ? "Add New" : "Update"} {entityName}
          {entityId && `: ${entityId}`}
        </>
      }
      btnText={`${formType} ${entityName}`}
    >
      {children?.(form, formType, data)}
    </Form>
  );
}
