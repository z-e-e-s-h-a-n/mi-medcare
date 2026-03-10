import { Text } from "@react-email/components";
import type { EmailTemplateComponent } from "../types/global";
import { Greeting } from "./components/greeting";
import { Header } from "./components/header";
import { Layout } from "./components/layout";

export const ConsultationRequest: EmailTemplateComponent<
  "consultationRequest"
> = (props) => {
  return (
    <Layout previewText="Consultation request received">
      <Header
        title="New Consultation Request"
        subtitle={props.consultationRequest.practiceName || ""}
      />
      <Greeting name={props.consultationRequest.fullName} />
      <Text className="text-base text-gray-900">
        We have received your consultation request.
      </Text>
      <Text className="text-base text-gray-900">
        <strong>Practice Name:</strong>{" "}
        {props.consultationRequest.practiceName || "N/A"}
      </Text>
      {props.consultationRequest.monthlyClaims && (
        <Text className="text-base text-gray-900">
          <strong>Monthly Claims:</strong>{" "}
          {props.consultationRequest.monthlyClaims}
        </Text>
      )}
      <Text className="text-base text-gray-900">
        Our team will contact you at {props.consultationRequest.email} or{" "}
        {props.consultationRequest.phone} shortly.
      </Text>
      {props.consultationRequest.message && (
        <Text className="text-base text-gray-900">
          <strong>Message:</strong> {props.consultationRequest.message}
        </Text>
      )}
    </Layout>
  );
};

ConsultationRequest.subject = () =>
  "Your consultation request has been received";
ConsultationRequest.message = () =>
  "We have received your consultation request and will contact you soon.";
