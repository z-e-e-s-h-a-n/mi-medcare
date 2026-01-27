import { OtpPurposeEnum, OtpTypeEnum } from "@schemas/enums";
import { z } from "zod";

export const emailSchema = z.string().min(11);
export const passwordSchema = z.string().min(8);
export const nameSchema = z.string().min(3);

export const signInSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
});

export const signUpSchema = signInSchema.extend({
  firstName: nameSchema,
  lastName: nameSchema.optional(),
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

export const changeEmailSchema = validateOtpSchema.extend({
  newEmail: emailSchema,
});
