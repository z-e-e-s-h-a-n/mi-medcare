import TagForm from "@/components/forms/TagForm";

type EditTagPageProps = {
  params: Promise<{ id: string }>;
};

const EditTagPage = async ({ params }: EditTagPageProps) => {
  const { id } = await params;
  return <TagForm entityId={id} formType="update" />;
};

export default EditTagPage;
