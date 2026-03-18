import z from "zod";
import {
  UserRoleEnum,
  UserSearchByEnum,
  UserSortByEnum,
  UserStatusEnum,
} from "../lib/enums";
import {
  baseQuerySchema,
  emailSchema,
  nameSchema,
  passwordSchema,
} from "../lib/schema";

export const CUUserSchema = z.object({
  firstName: nameSchema,
  lastName: nameSchema.optional(),
  email: emailSchema,
  role: UserRoleEnum,
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
