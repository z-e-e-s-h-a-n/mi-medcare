import z from "zod";
import {
  baseQuerySchema,
  emailSchema,
  idSchema,
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
  trafficSourceId: idSchema.optional(),
  fullName: nameSchema,
  practiceName: z
    .string()
    .trim()
    .min(2, "Please tell us your organization or practice name"),
  email: emailSchema,
  phone: phoneSchema,
  practiceType: PracticeTypeEnum,
  monthlyClaims: MonthlyClaimsRangeEnum,
  message: z.string().min(10, "Tell us what you need help with"),
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
