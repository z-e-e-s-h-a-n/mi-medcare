import PageForm from "@/components/forms/PageForm";

type EditPagePageProps = {
  params: Promise<{ id: string }>;
};

const EditPagePage = async ({ params }: EditPagePageProps) => {
  const { id } = await params;
  return <PageForm entityId={id} formType="update" />;
};

export default EditPagePage;
