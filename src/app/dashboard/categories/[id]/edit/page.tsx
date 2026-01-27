import CUCategoryForm from "@components/dashboard/CUCategoryForm";

const Page = async ({ params }: AppPageProps<{ id: string }>) => {
  const { id } = await params;

  return <CUCategoryForm formType="update" entityId={id} />;
};

export default Page;
