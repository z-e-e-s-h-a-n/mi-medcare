import { Text } from "@react-email/components";
import { appName } from "@workspace/shared/constants";
import type { EmailTemplateComponent } from "../types/global";
import { Greeting } from "./components/greeting";
import { Header } from "./components/header";
import { Layout } from "./components/layout";

export const SignUp: EmailTemplateComponent<"signUp"> = ({ user }) => (
  <Layout previewText={`Welcome to ${appName.default}`}>
    <Header
      title={`Welcome to ${appName.default}`}
      subtitle="Your medical billing account is ready"
    />
    <Greeting name={user.displayName} />
    <Text className="text-base text-gray-900">
      Your account has been created successfully.
    </Text>
    <Text className="text-base text-gray-900">
      You can now sign in to manage billing workflows, service requests, and
      account settings with MI MedCare.
    </Text>
  </Layout>
);

SignUp.subject = () => `Welcome to ${appName.default}`;
SignUp.message = () => `Welcome to ${appName.default}. Your account is ready.`;
