import AuthForm from "@components/dashboard/AuthForm";
import { notFound } from "next/navigation";

const page = async ({
  params,
  searchParams,
}: AppPageProps<{ type: AuthFormType }, ValidateOtpType>) => {
  const { type } = await params;
  const queryParams = await searchParams;

  if (
    !["sign-up", "sign-in", "reset-password", "set-password"].includes(type)
  ) {
    return notFound();
  }
  return <AuthForm formType={type} queryParams={queryParams} />;
};

export default page;
