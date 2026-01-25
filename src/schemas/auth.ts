import { OtpPurposeEnum, OtpTypeEnum } from "@schemas/enums";
import { z } from "zod";

export const email = z.string().min(11);
export const password = z.string().min(8);
export const name = z.string().min(3);

export const signInSchema = z.object({
  email,
  password: password,
});

export const signUpSchema = signInSchema.extend({
  firstName: name,
  lastName: name.optional(),
})

export const requestOtpSchema = z.object({
  email,
  purpose: OtpPurposeEnum,
});

export const validateOtpSchema = requestOtpSchema.extend({
  secret: z.string().min(6),
  type: OtpTypeEnum.default("numericCode"),
});

export const resetPasswordSchema = validateOtpSchema.extend({
  newPassword: password,
});

export const changeEmailSchema = validateOtpSchema.extend({
  newEmail: email,
});
