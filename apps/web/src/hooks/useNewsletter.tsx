import { useMutation } from "@tanstack/react-query";
import type { ApiException, ApiSuccess } from "@workspace/sdk";
import { subscribeNewsletter } from "@workspace/sdk/newsletter";

export const useSubscribeNewsletter = () => {
  const newsletterMutation = useMutation<
    ApiSuccess<null>,
    ApiException,
    NewsletterSubscriberDto
  >({
    mutationFn: subscribeNewsletter,
  });

  return {
    mutateAsync: newsletterMutation.mutateAsync,
    isPending: newsletterMutation.isPending,
    mutateError: newsletterMutation.error,
  };
};
