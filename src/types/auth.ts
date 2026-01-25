import z from "zod";
import * as schema from "../schemas/auth";
import { User, UserRole } from "@generated/prisma";

declare global {
  /* ======================================================
     AUTH — SCHEMA TYPES
  ===================================================== */

  // Client

  type AuthFormType = "sign-up" | "sign-in" | "reset-password" | "set-password";

  type SignInType = z.input<typeof schema.signInSchema>;

  type SignUpType = z.input<typeof schema.signUpSchema>;

  type RequestOtpType = z.input<typeof schema.requestOtpSchema>;

  type ValidateOtpType = z.input<typeof schema.validateOtpSchema>;

  type ResetPasswordType = z.input<typeof schema.resetPasswordSchema>;

  type ChangeEmailType = z.input<typeof schema.changeEmailSchema>;

  // Server
  type SignInDto = z.output<typeof schema.signInSchema>;

  type SignUpDto = z.output<typeof schema.signUpSchema>;

  type RequestOtpDto = z.output<typeof schema.requestOtpSchema>;

  type ValidateOtpDto = z.output<typeof schema.validateOtpSchema>;

  type ResetPasswordDto = z.output<typeof schema.resetPasswordSchema>;

  type ChangeEmailDto = z.output<typeof schema.changeEmailSchema>;

  /* ======================================================
     AUTH — RESPONSES
  ===================================================== */

  type BaseUserResponse = Pick<User, "id" | "displayName" | "email">;

  type UserResponse = Pick<
    User,
    | "firstName"
    | "lastName"
    | "role"
    | "imageId"
    | "isEmailVerified"
    | "lastLoginAt"
  > &
    BaseResponse &
    BaseUserResponse & {
      image?: MediaResponse | null;
    };

  interface SignInResponse {
    id: string;
    role: UserRole;
  }

  interface ValidateOtpResponse {
    secret?: string;
  }
}

export {};
