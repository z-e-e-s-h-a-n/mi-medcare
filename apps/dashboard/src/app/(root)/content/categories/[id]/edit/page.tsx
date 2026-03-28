import CategoryForm from "@/components/forms/CategoryForm";
import type { AppPageProps } from "@workspace/contracts";

const EditCategoryPage = async ({ params }: AppPageProps) => {
  const { id } = await params;
  return <CategoryForm entityId={id} formType="update" />;
};

export default EditCategoryPage;
