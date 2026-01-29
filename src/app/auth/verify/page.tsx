import VerifyPage, {
  VerifyAuthProps,
} from "@components/dashboard/VerifyAuthPage";

const page = async ({ searchParams }: AppPageProps) => {
  const query = (await searchParams) as unknown as VerifyAuthProps;

  return <VerifyPage {...query} />;
};

export default page;
