import { useMutation } from "@tanstack/react-query";
import type { ApiException, ApiSuccess } from "@workspace/sdk";
import { createContactMessage } from "@workspace/sdk/contact";

export const useCreateMessage = () => {
  const contactMutation = useMutation<
    ApiSuccess<null>,
    ApiException,
    CreateContactMessageDto
  >({
    mutationFn: createContactMessage,
  });

  return {
    mutateAsync: contactMutation.mutateAsync,
    isPending: contactMutation.isPending,
    mutateError: contactMutation.error,
  };
};
