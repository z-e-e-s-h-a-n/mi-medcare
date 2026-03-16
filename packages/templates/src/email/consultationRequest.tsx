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
        title="Consultation Request Received"
        subtitle={props.consultationRequest.practiceName || ""}
      />
      <Greeting name={props.consultationRequest.fullName} />
      <Text className="text-base text-gray-900">
        Thank you for reaching out to MI MedCare. We have received your
        consultation request.
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
        Our team will contact you soon to discuss your billing goals, current
        workflow, and where we can support your revenue cycle operations.
      </Text>
      <Text className="text-base text-gray-900">
        Contact details on file: {props.consultationRequest.email}
        {props.consultationRequest.phone
          ? ` | ${props.consultationRequest.phone}`
          : ""}
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
  "We received your consultation request and will contact you soon.";
