import { useMutation } from "@tanstack/react-query";
import type { CreateConsultationRequestDto } from "@workspace/contracts/consultation";
import type { ApiException, ApiSuccess } from "@workspace/sdk";
import { createConsultationRequest } from "@workspace/sdk/consultation";

export const useCreateConsultationRequest = () => {
  const consultationMutation = useMutation<
    ApiSuccess<null>,
    ApiException,
    CreateConsultationRequestDto
  >({
    mutationFn: createConsultationRequest,
  });

  return {
    mutateAsync: consultationMutation.mutateAsync,
    isPending: consultationMutation.isPending,
    mutateError: consultationMutation.error,
  };
};
