import * as enums from "@schemas/enums";
import { baseQuerySchema } from "@schemas/shared";
import z from "zod";

declare global {
  /* --------------------
     Shared - Utilities
  -------------------- */

  type Nullable<T> = T | null;
  type Optional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  type ArrayItem<T> = T extends any[] ? T[number] : never;

  /* --------------------
     Shared - TYPES
  -------------------- */

  type SortOrderType = z.infer<typeof enums.SortOrderEnum>;
  type AuthActions = "verifyEmail" | "setPassword";
  type OAuthProvider = "google" | "facebook" | "apple";

  type UserRole = z.infer<typeof enums.UserRoleEnum>;

  type OtpPurpose = z.infer<typeof enums.OtpPurposeEnum>;
  type OtpType = z.infer<typeof enums.OtpTypeEnum>;

  type NotificationPurpose =
    | "signin"
    | "signup"
    | "contactAdmin"
    | "contactUser"
    | OtpPurpose;

  interface HealthCheckResponse {
    message: string;
    status: string;
    uptime: string;
    timestamp: string;
  }

  interface BaseResponse {
    id: string;
    createdAt: Date;
    updatedAt: Date;
  }

  type BaseQueryType = z.infer<typeof baseQuerySchema> & {
    sortBy?: string;
    searchBy?: string;
  };

  interface BaseQueryResponse {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  }
}

export {};
