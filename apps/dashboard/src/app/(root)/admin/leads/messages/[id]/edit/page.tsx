import ContactMessageForm from "@/components/forms/ContactMessageForm";

type EditContactMessagePageProps = {
  params: Promise<{ id: string }>;
};

const EditContactMessagePage = async ({
  params,
}: EditContactMessagePageProps) => {
  const { id } = await params;
  return <ContactMessageForm entityId={id} formType="update" />;
};

export default EditContactMessagePage;
