import VerifyPage, {
  VerifyAuthProps,
} from "@components/dashboard/VerifyAuthPage";
import { notFound, redirect } from "next/navigation";
import { toast } from "sonner";

const page = async ({ searchParams }: AppPageProps) => {
  const query = (await searchParams) as unknown as VerifyAuthProps;

  if (!query.email || !query.purpose || !query.secret) {
    notFound();
  } else if (!["verifyEmail", "changeEmail"].includes(query.purpose)) {
    toast.error("Invalid Purpose");
    redirect("/auth/sign-in");
  }
  return <VerifyPage {...query} />;
};

export default page;
