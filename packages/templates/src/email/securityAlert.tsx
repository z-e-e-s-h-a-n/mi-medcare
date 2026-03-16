import { Text } from "@react-email/components";
import type { EmailTemplateComponent } from "../types/global";
import { Greeting } from "./components/greeting";
import { Header } from "./components/header";
import { Layout } from "./components/layout";

export const SecurityAlert: EmailTemplateComponent<"securityAlert"> = ({
  user,
  message,
}) => (
  <Layout previewText="Security alert">
    <Header title="Security Alert" subtitle="Please review this activity" />
    <Greeting name={user.displayName} />
    <Text className="text-base text-gray-900">
      We detected account activity that should be reviewed.
    </Text>
    {message && <Text className="text-base text-gray-900">{message}</Text>}
    <Text className="text-base text-gray-900">
      If this activity was not expected, update your password and review your
      sign-in settings right away.
    </Text>
  </Layout>
);

SecurityAlert.subject = () => "Security alert";
SecurityAlert.message = (props) =>
  props.message || "We detected account activity that should be reviewed.";
