import { User } from "@generated/prisma";
import { userProfileSchema } from "@schemas/user";
import z from "zod";

declare global {
  export type UserProfileType = z.input<typeof userProfileSchema>;
  export type UserProfileDto = z.infer<typeof userProfileSchema>;

  type BaseUserResponse = Pick<User, "id" | "displayName" | "email">;

  type UserResponse = Omit<User, "password"> & { image?: MediaResponse | null };
}

export {};
