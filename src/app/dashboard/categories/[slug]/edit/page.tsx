import CUCategoryForm from "@components/dashboard/CUCategoryForm";

const Page = async ({ params }: AppPageProps<{ slug: string }>) => {
  const { slug } = await params;

  return <CUCategoryForm formType="update" entityId={slug} />;
};

export default Page;
