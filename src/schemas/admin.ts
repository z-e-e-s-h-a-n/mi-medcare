import z from "zod";
import { baseQuerySchema } from "./shared";
import {
  UserRoleEnum,
  UserSearchByEnum,
  UserSortByEnum,
  UserStatusEnum,
} from "./enums";
import { nameSchema, passwordSchema, signUpSchema } from "./auth";

export const CUUserSchema = signUpSchema.extend({
  role: UserRoleEnum.exclude(["admin"]),
  displayName: nameSchema,
  status: UserStatusEnum,
  password: passwordSchema.optional(),
});

export const userQuerySchema = baseQuerySchema(
  UserSortByEnum,
  UserSearchByEnum,
).extend({
  role: UserRoleEnum.optional(),
  isEmailVerified: z.boolean().optional(),
  status: UserStatusEnum.optional(),
});
