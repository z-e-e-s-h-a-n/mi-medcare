import type z from "zod";
import type {
  createConsultationRequestSchema,
  updateConsultationRequestSchema,
  consultationRequestQuerySchema,
} from "./schema";
import type { ConsultationRequest } from "@workspace/db/browser";

declare global {
  type CreateConsultationRequestType = z.input<
    typeof createConsultationRequestSchema
  >;
  type CreateConsultationRequestDto = z.output<
    typeof createConsultationRequestSchema
  >;

  type UpdateConsultationRequestType = z.input<
    typeof updateConsultationRequestSchema
  >;
  type UpdateConsultationRequestDto = z.output<
    typeof updateConsultationRequestSchema
  >;

  type ConsultationRequestQueryType = z.input<
    typeof consultationRequestQuerySchema
  >;
  type ConsultationRequestQueryDto = z.output<
    typeof consultationRequestQuerySchema
  >;

  interface ConsultationRequestResponse extends Sanitize<ConsultationRequest> {
    repliedBy?: BaseUserResponse;
  }

  interface ConsultationRequestQueryResponse extends BaseQueryResponse {
    messages: ConsultationRequestResponse[];
  }
}

export {};
