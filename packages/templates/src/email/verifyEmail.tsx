import { Text } from "@react-email/components";
import type { EmailTemplateComponent } from "../types/global";
import { ActionBlock } from "./components/actionBlock";
import { Greeting } from "./components/greeting";
import { Header } from "./components/header";
import { Layout } from "./components/layout";

export const VerifyEmail: EmailTemplateComponent<"verifyEmail"> = ({
  user,
  otp,
  email,
  clientUrl,
}) => {
  const link = `${clientUrl}/auth/verify?email=${email}&purpose=${otp?.purpose}&secret=${otp?.secret}&type=${otp?.type}`;

  return (
    <Layout previewText="Verify your email">
      <Header title="Verify Your Email Address" />
      <Greeting name={user.displayName} />
      <Text className="text-base text-gray-900">
        Please verify your email to activate your account.
      </Text>
      {otp ? (
        <ActionBlock link={link} label="Verify email" otp={otp} />
      ) : (
        <Text className="text-base text-gray-900">
          Your email has been verified successfully.
        </Text>
      )}
    </Layout>
  );
};

VerifyEmail.subject = () => "Verify your email";
VerifyEmail.message = (props) =>
  props.otp ? `Verification code: ${props.otp.secret}` : "Your email has been verified.";
