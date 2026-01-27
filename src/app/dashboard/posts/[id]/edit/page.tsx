import CUPostForm from "@components/dashboard/CUPostForm";

const Page = async ({ params }: AppPageProps<{ id: string }>) => {
  const { id } = await params;

  return <CUPostForm formType="update" entityId={id} />;
};

export default Page;
