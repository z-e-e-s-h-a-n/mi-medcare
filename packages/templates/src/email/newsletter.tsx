import { Text } from "@react-email/components";
import type {
  EmailTemplateComponent,
  EmailTemplateProps,
} from "../types/global";
import { Greeting } from "./components/greeting";
import { Header } from "./components/header";
import { Layout } from "./components/layout";

const isUnsubscribed = (props: EmailTemplateProps<"newsletter">) => {
  return !props.newsletterSubscriber.isActive;
};

export const Newsletter: EmailTemplateComponent<"newsletter"> = (props) => {
  if (isUnsubscribed(props)) {
    return (
      <Layout previewText="You have unsubscribed">
        <Header title="You Have Been Unsubscribed" />
        <Greeting name={props.newsletterSubscriber.name} />
        <Text className="text-base text-gray-900">
          You have successfully unsubscribed from MI MedCare updates. You will
          no longer receive product news, billing insights, or service
          announcements.
        </Text>
      </Layout>
    );
  }

  return (
    <Layout previewText="Subscription confirmed">
      <Header title="Subscription Confirmed" />
      <Greeting name={props.newsletterSubscriber.name} />
      <Text className="text-base text-gray-900">
        Thank you for subscribing to MI MedCare updates. You will now receive
        announcements, billing insights, and service updates from our team.
      </Text>
    </Layout>
  );
};

Newsletter.subject = (props) =>
  isUnsubscribed(props)
    ? "Unsubscription successful"
    : "Newsletter subscription confirmed";
Newsletter.message = (props) =>
  isUnsubscribed(props)
    ? "You have successfully unsubscribed from our newsletter."
    : "Thank you for subscribing to our newsletter.";
