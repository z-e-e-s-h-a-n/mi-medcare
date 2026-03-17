import PostForm from "@/components/forms/PostForm";
import type { AppPageProps } from "@workspace/contracts";

const EditPostPage = async ({ params }: AppPageProps) => {
  const { id } = await params;
  return <PostForm entityId={id} formType="update" />;
};

export default EditPostPage;
