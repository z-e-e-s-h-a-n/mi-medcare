import type z from "zod";
import { CUUserSchema, userQuerySchema } from "@schemas/admin";

declare global {
  /* ======================================================
     ADMIN — TYPES
  ===================================================== */

  // client
  type CUUserType = z.input<typeof CUUserSchema>;
  type UserQueryType = z.input<typeof userQuerySchema>;

  // server
  type CUUserDto = z.output<typeof CUUserSchema>;
  type UserQueryDto = z.output<typeof userQuerySchema>;

  /* ======================================================
     ADMIN —  RESPONSES
  ===================================================== */

  interface UserQueryResponse extends BaseQueryResponse {
    users: UserResponse[];
  }
}

export {};
