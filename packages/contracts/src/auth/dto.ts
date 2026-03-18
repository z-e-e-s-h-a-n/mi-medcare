import {
  signInSchema,
  requestOtpSchema,
  validateOtpSchema,
  resetPasswordSchema,
  updateEmailSchema,
  updateMfaSchema,
} from "./schema";
import { createZodDto } from "nestjs-zod";

export class SignInDto extends createZodDto(signInSchema) {}

export class RequestOtpDto extends createZodDto(requestOtpSchema) {}

export class ValidateOtpDto extends createZodDto(validateOtpSchema) {}

export class ResetPasswordDto extends createZodDto(resetPasswordSchema) {}

export class UpdateMfaDto extends createZodDto(updateMfaSchema) {}

export class UpdateEmailDto extends createZodDto(updateEmailSchema) {}
