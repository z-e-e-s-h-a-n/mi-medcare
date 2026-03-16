import PostForm from "@/components/forms/PostForm";

type EditPostPageProps = {
  params: Promise<{ id: string }>;
};

const EditPostPage = async ({ params }: EditPostPageProps) => {
  const { id } = await params;
  return <PostForm entityId={id} formType="update" />;
};

export default EditPostPage;
