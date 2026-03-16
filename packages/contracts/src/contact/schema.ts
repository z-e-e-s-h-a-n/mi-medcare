import z from "zod";
import {
  baseQuerySchema,
  emailSchema,
  idSchema,
  nameSchema,
  phoneSchema,
} from "../lib/schema";
import {
  ContactMessageSearchByEnum,
  ContactMessageSortByEnum,
  ContactMessageStatusEnum,
  ContactTimePreferenceEnum,
  PracticeTypeEnum,
} from "../lib/enums";

export const createContactMessageSchema = z.object({
  trafficSourceId: idSchema.optional(),
  fullName: nameSchema,
  practiceName: z.string().optional(),
  email: emailSchema,
  phone: phoneSchema,
  practiceType: PracticeTypeEnum,
  bestContactTime: ContactTimePreferenceEnum,
  message: z.string().min(10, "Tell us a bit more about your request"),
});

export const updateContactMessageSchema = z.object({
  notes: z.string().optional(),
  status: ContactMessageStatusEnum,
});

export const contactMessageQuerySchema = baseQuerySchema(
  ContactMessageSortByEnum,
  ContactMessageSearchByEnum,
).extend({
  status: ContactMessageStatusEnum.optional(),
});
