import TagForm from "@/components/forms/TagForm";
import type { AppPageProps } from "@workspace/contracts";

const EditTagPage = async ({ params }: AppPageProps) => {
  const { id } = await params;
  return <TagForm entityId={id} formType="update" />;
};

export default EditTagPage;
