import type z from "zod";
import type {
  createConsultationRequestSchema,
  updateConsultationRequestSchema,
  consultationRequestQuerySchema,
} from "./schema";
import type { ConsultationRequest } from "@workspace/db/browser";
import type { BaseQueryResponse, Sanitize } from "../lib/types";
import type { BaseUserResponse } from "../user/types";

export type CreateConsultationRequestType = z.input<
  typeof createConsultationRequestSchema
>;

export type UpdateConsultationRequestType = z.input<
  typeof updateConsultationRequestSchema
>;

export type ConsultationRequestQueryType = z.input<
  typeof consultationRequestQuerySchema
>;

export interface ConsultationRequestResponse
  extends Sanitize<ConsultationRequest> {
  repliedBy?: BaseUserResponse;
}

export interface ConsultationRequestQueryResponse extends BaseQueryResponse {
  messages: ConsultationRequestResponse[];
}
