import BaseProviderWrapper from "@workspace/ui/provider-wrapper";
import PushNotificationsBootstrap from "@/provider/push-notifications";

const ProviderWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <BaseProviderWrapper>
      <PushNotificationsBootstrap />
      {children}
    </BaseProviderWrapper>
  );
};

export default ProviderWrapper;
