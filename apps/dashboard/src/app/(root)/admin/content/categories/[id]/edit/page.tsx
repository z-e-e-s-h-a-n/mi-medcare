import CategoryForm from "@/components/forms/CategoryForm";

type EditCategoryPageProps = {
  params: Promise<{ id: string }>;
};

const EditCategoryPage = async ({ params }: EditCategoryPageProps) => {
  const { id } = await params;
  return <CategoryForm entityId={id} formType="update" />;
};

export default EditCategoryPage;
