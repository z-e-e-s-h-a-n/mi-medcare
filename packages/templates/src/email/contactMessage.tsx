import { Text } from "@react-email/components";
import { Greeting } from "./components/greeting";
import { Header } from "./components/header";
import { Layout } from "./components/layout";

const isReplied = (props: EmailTemplateProps<"contactMessage">) =>
  props.contactMessage.status === "replied";

export const ContactMessage: EmailTemplateComponent<"contactMessage"> = (
  props,
) => {
  if (isReplied(props)) {
    return (
      <Layout previewText="Your message has been replied">
        <Header
          title="Message Replied"
          subtitle={props.contactMessage.practiceName || ""}
        />
        <Greeting name={props.contactMessage.fullName} />
        <Text className="text-base text-gray-900">
          Your message regarding "
          {props.contactMessage.practiceName || "your inquiry"}" has been
          replied.
        </Text>
        {props.contactMessage.notes && (
          <Text className="text-base text-gray-900">
            Reply Notes: {props.contactMessage.notes}
          </Text>
        )}
      </Layout>
    );
  }

  return (
    <Layout previewText="New contact message received">
      <Header
        title="New Contact Message"
        subtitle={props.contactMessage.practiceName || ""}
      />
      <Greeting name={props.contactMessage.fullName} />
      <Text className="text-base text-gray-900">
        We have received your message regarding "
        {props.contactMessage.practiceName || "your inquiry"}". Our team will
        get back to you shortly.
      </Text>
    </Layout>
  );
};

ContactMessage.subject = (props) =>
  isReplied(props)
    ? "Your contact message has been replied"
    : "New contact message received";

ContactMessage.message = (props) =>
  isReplied(props)
    ? "Your contact message has been replied."
    : "We have received your contact message and will respond shortly.";
