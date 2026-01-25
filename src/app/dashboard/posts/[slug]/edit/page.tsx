import CUPostForm from "@components/dashboard/CUPostForm";

const Page = async ({ params }: AppPageProps<{ slug: string }>) => {
  const { slug } = await params;

  return <CUPostForm formType="update" entityId={slug} />;
};

export default Page;
