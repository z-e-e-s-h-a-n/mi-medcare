import { Text } from "@react-email/components";
import type { EmailTemplateComponent } from "../types/global";
import { ActionBlock } from "./components/actionBlock";
import { Greeting } from "./components/greeting";
import { Header } from "./components/header";
import { Layout } from "./components/layout";

export const UpdateEmail: EmailTemplateComponent<"updateEmail"> = ({
  user,
  otp,
  clientUrl,
  meta,
}) => {
  const { oldEmail, newEmail } = meta;

  if (otp) {
    const link = `${clientUrl}/auth/verify?email=${oldEmail}&newEmail=${newEmail}&purpose=${otp.purpose}&secret=${otp.secret}&type=${otp.type}`;
    return (
      <Layout previewText="Email change request">
        <Header
          title="Email Change Request"
          subtitle="Confirm your new email"
        />
        <Greeting name={user.displayName} />
        <Text className="text-base text-gray-900">
          A request was made to change your email.
        </Text>
        <Text className="text-base text-gray-900">
          Current Email: <strong>{oldEmail}</strong>
        </Text>
        <Text className="text-base text-gray-900">
          New Email: <strong>{newEmail}</strong>
        </Text>
        <ActionBlock
          link={link}
          label="Confirm Email Change"
          otp={otp}
        />
      </Layout>
    );
  }

  return (
    <Layout previewText="Email updated">
      <Header title="Email Address Updated" />
      <Greeting name={user.displayName} />
      <Text className="text-base text-gray-900">
        Your email has been successfully updated.
      </Text>
      <Text className="text-base text-gray-900">
        Previous Email: <strong>{oldEmail}</strong>
      </Text>
      <Text className="text-base text-gray-900">
        New Email: <strong>{newEmail}</strong>
      </Text>
    </Layout>
  );
};

UpdateEmail.subject = (props) =>
  props.otp ? "Email change request" : "Email updated";
UpdateEmail.message = (props) =>
  props.otp ? "Confirm email change." : "Email updated.";
