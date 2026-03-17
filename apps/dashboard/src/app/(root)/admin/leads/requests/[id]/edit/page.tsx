import ConsultationRequestForm from "@/components/forms/ConsultationRequestForm";
import type { AppPageProps } from "@workspace/contracts";

const EditConsultationRequestPage = async ({ params }: AppPageProps) => {
  const { id } = await params;
  return <ConsultationRequestForm entityId={id} formType="update" />;
};

export default EditConsultationRequestPage;
