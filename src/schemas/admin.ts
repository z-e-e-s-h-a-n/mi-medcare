import z from "zod";
import { baseQuerySchema } from "./shared";
import {
  UserRoleEnum,
  UserSearchByEnum,
  UserSortByEnum,
  UserStatusEnum,
} from "./enums";
import { signUpSchema } from "./auth";

export const CUUserSchema = signUpSchema.extend({
  role: UserRoleEnum.exclude(["admin"]),
});

export const userQuerySchema = baseQuerySchema(
  UserSortByEnum,
  UserSearchByEnum,
).extend({
  role: UserRoleEnum.optional(),
  isEmailVerified: z.boolean().optional(),
  status: UserStatusEnum.optional(),
});
