import { z } from "zod";
import { MfaMethodEnum, OtpPurposeEnum, OtpTypeEnum } from "../lib/enums";
import { emailSchema, passwordSchema } from "../lib/schema";

export const signInSchema = z.object({
  email: emailSchema,
  password: passwordSchema.optional(),
});

export const requestOtpSchema = z.object({
  email: emailSchema,
  purpose: OtpPurposeEnum,
});

export const validateOtpSchema = requestOtpSchema.extend({
  secret: z.string().min(6),
  type: OtpTypeEnum.default("numericCode"),
});

export const resetPasswordSchema = validateOtpSchema.extend({
  newPassword: passwordSchema,
});

export const updateMfaSchema = validateOtpSchema.extend({
  preferredMfa: MfaMethodEnum,
});

export const updateEmailSchema = validateOtpSchema.extend({
  newEmail: emailSchema,
});
