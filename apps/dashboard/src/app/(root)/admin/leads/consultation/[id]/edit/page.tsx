import ConsultationRequestForm from "@/components/forms/ConsultationRequestForm";

type EditConsultationRequestPageProps = {
  params: Promise<{ id: string }>;
};

const EditConsultationRequestPage = async ({
  params,
}: EditConsultationRequestPageProps) => {
  const { id } = await params;
  return <ConsultationRequestForm entityId={id} />;
};

export default EditConsultationRequestPage;
