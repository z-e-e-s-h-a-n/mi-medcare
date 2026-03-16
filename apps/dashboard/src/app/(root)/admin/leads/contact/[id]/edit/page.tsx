import ContactReplyForm from "@/components/forms/ContactReplyForm";

type EditContactMessagePageProps = {
  params: Promise<{ id: string }>;
};

const EditContactMessagePage = async ({
  params,
}: EditContactMessagePageProps) => {
  const { id } = await params;
  return <ContactReplyForm entityId={id} />;
};

export default EditContactMessagePage;
