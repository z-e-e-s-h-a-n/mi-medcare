import { Text } from "@react-email/components";
import type { EmailTemplateComponent } from "../types/global";
import { Greeting } from "./components/greeting";
import { Header } from "./components/header";
import { Layout } from "./components/layout";

export const SignIn: EmailTemplateComponent<"signIn"> = ({ user }) => (
  <Layout previewText="New account sign-in detected">
    <Header title="New Sign-in Detected" subtitle="Security activity notice" />
    <Greeting name={user.displayName} />
    <Text className="text-base text-gray-900">
      A sign-in to your MI MedCare account was detected.
    </Text>
    <Text className="text-base text-gray-900">
      If this was not you, reset your password immediately and review your
      account security settings.
    </Text>
  </Layout>
);

SignIn.subject = () => "New sign-in detected";
SignIn.message = () => "New sign-in detected.";
