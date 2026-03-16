import { Text } from "@react-email/components";
import type { EmailTemplateComponent } from "../types/global";
import { ActionBlock } from "./components/actionBlock";
import { Greeting } from "./components/greeting";
import { Header } from "./components/header";
import { Layout } from "./components/layout";

export const UpdateIdentifier: EmailTemplateComponent<"updateIdentifier"> = ({
  user,
  otp,
  identifier,
  clientUrl,
  meta,
}) => {
  const { oldIdentifier, newIdentifier } = meta;

  if (otp) {
    const link = `${clientUrl}/auth/verify?email=${oldIdentifier}&newEmail=${newIdentifier}&purpose=${otp.purpose}&secret=${otp.secret}&type=${otp.type}`;
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
          Current Email: <strong>{oldIdentifier}</strong>
        </Text>
        <Text className="text-base text-gray-900">
          New Email: <strong>{newIdentifier}</strong>
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
        Previous Email: <strong>{oldIdentifier}</strong>
      </Text>
      <Text className="text-base text-gray-900">
        New Email: <strong>{newIdentifier}</strong>
      </Text>
    </Layout>
  );
};

UpdateIdentifier.subject = (props) =>
  props.otp ? "Email change request" : "Email updated";
UpdateIdentifier.message = (props) =>
  props.otp ? "Confirm email change." : "Email updated.";
