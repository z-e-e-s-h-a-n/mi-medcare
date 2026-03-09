import z from "zod";
import {
  baseQuerySchema,
  emailSchema,
  nameSchema,
  phoneSchema,
} from "../lib/schema";
import {
  ConsultationRequestStatusEnum,
  ConsultationRequestSortByEnum,
  ConsultationRequestSearchByEnum,
  MonthlyClaimsRangeEnum,
  PracticeTypeEnum,
} from "../lib/enums";

export const createConsultationRequestSchema = z.object({
  fullName: nameSchema,
  practiceName: z.string(),
  email: emailSchema,
  phone: phoneSchema,
  practiceType: PracticeTypeEnum,
  monthlyClaims: MonthlyClaimsRangeEnum,
  message: z.string(),
});

export const updateConsultationRequestSchema = z.object({
  notes: z.string().optional(),
  status: ConsultationRequestStatusEnum,
});

export const consultationRequestQuerySchema = baseQuerySchema(
  ConsultationRequestSortByEnum,
  ConsultationRequestSearchByEnum,
).extend({
  status: ConsultationRequestStatusEnum.optional(),
});
