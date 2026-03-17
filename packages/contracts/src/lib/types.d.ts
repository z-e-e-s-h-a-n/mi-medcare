import { z } from "zod";
import * as enums from "./enums";
import type { ReactNode } from "react";
import { Prisma } from "@workspace/db/browser";

/* ======================================================
   GLOBAL DECLARATIONS
====================================================== */

export type Nullable<T> = T | null;
export type DecimalInstance = InstanceType<typeof Prisma.Decimal>;
export type StrictOmit<T, K extends keyof T> = Omit<T, K>;
export type Optional<T, K extends keyof T> = Omit<T, K> &
  Partial<Pick<T, K>>;
export type ArrayItem<T> = T extends any[] ? T[number] : never;

export type Primitive =
  | string
  | number
  | boolean
  | bigint
  | symbol
  | undefined
  | null;

export type Sanitize<T> = T extends DecimalInstance
  ? number
  : T extends Date
    ? string
    : T extends null
      ? undefined
      : T extends Primitive
        ? T
        : T extends Array<infer U>
          ? Array<Sanitize<U>>
          : {
              [K in keyof T]: Sanitize<T[K]>;
            };

export interface SegmentParams {
  [key: string]: string;
}

export type TSearchParams = Record<string, string | string[] | undefined>;

export interface AppPageProps<
  TParams extends SegmentParams = SegmentParams,
  TSParams extends TSearchParams = TSearchParams,
> {
  params: Promise<TParams>;
  searchParams: Promise<TSParams>;
}

export interface AppLayoutProps {
  children?: ReactNode;
}

export type FormSectionType = "add" | "update";
export type AuthFormType =
  | "sign-up"
  | "sign-in"
  | "reset-password"
  | "set-password";

export interface BaseCUFormProps {
  entityId?: string;
  formType: FormSectionType;
}

export type SortOrderType = z.infer<typeof enums.SortOrderEnum>;
export type ChartRangeType = z.infer<typeof enums.ChartRangeEnum>;

export type OAuthProvider = "google" | "facebook" | "apple";
export type AuthActions = "verifyEmail" | "verifyMfa" | "setPassword";

export type OtpType = z.infer<typeof enums.OtpTypeEnum>;
export type OtpPurpose = z.infer<typeof enums.OtpPurposeEnum>;

export type MfaMethod = z.infer<typeof enums.MfaMethodEnum>;
export type SessionStatus = z.infer<typeof enums.SessionStatusEnum>;

export type PushProvider = z.infer<typeof enums.PushProviderEnum>;
export type MessagingChannel = z.infer<typeof enums.MessagingChannelEnum>;
export type NotificationChannel = z.infer<
  typeof enums.NotificationChannelEnum
>;
export type NotificationPurpose = z.infer<
  typeof enums.NotificationPurposeEnum
>;
export type NotificationStatus = z.infer<typeof enums.NotificationStatusEnum>;
export type NotificationPriority = z.infer<
  typeof enums.NotificationPriorityEnum
>;

export type BaseSortByType = z.infer<typeof enums.BaseSortByEnum>;

export interface BaseQueryType {
  page?: number;
  limit?: number;
  search?: string;
  sortOrder?: SortOrderType;
  sortBy?: string;
  searchBy?: string;
}

export interface HealthCheckResponse {
  message: string;
  status: string;
  uptime: string;
  timestamp: string;
}

export interface BaseResponse {
  id: string;
}

export interface BaseQueryResponse {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export type UserRole = z.infer<typeof enums.UserRoleEnum>;
export type UserStatus = z.infer<typeof enums.UserStatusEnum>;

export type UserSearchByType = z.infer<typeof enums.UserSearchByEnum>;
export type UserSortByType = z.infer<typeof enums.UserSortByEnum>;

export type MediaType = z.infer<typeof enums.MediaTypeEnum>;
export type MediaVisibility = z.infer<typeof enums.MediaVisibilityEnum>;

export type MediaSearchByType = z.infer<typeof enums.MediaSearchByEnum>;
export type MediaSortByType = z.infer<typeof enums.MediaSortByEnum>;

export type PracticeType = z.infer<typeof enums.PracticeTypeEnum>;
export type ConsultationStatus = z.infer<
  typeof enums.ConsultationRequestStatusEnum
>;

export type MonthlyClaimsRangeType = z.infer<
  typeof enums.MonthlyClaimsRangeEnum
>;
export type ContactMessageStatus = z.infer<
  typeof enums.ContactMessageStatusEnum
>;
export type ContactTimePreference = z.infer<
  typeof enums.ContactTimePreferenceEnum
>;

export type ContactMessageSortByType = z.infer<
  typeof enums.ContactMessageSortByEnum
>;
export type ContactMessageSearchByType = z.infer<
  typeof enums.ContactMessageSearchByEnum
>;

export type ConsultationRequestSortByType = z.infer<
  typeof enums.ConsultationRequestSortByEnum
>;
export type ConsultationRequestSearchByType = z.infer<
  typeof enums.ConsultationRequestSearchByEnum
>;

export type NewsletterSubscriberSortByType = z.infer<
  typeof enums.NewsletterSubscriberSortByEnum
>;
export type NewsletterSubscriberSearchByType = z.infer<
  typeof enums.NewsletterSubscriberSearchByEnum
>;

export type CategorySearchByType = z.infer<typeof enums.CategorySearchByEnum>;
export type CategorySortByType = z.infer<typeof enums.CategorySortByEnum>;
export type TagSearchByType = z.infer<typeof enums.TagSearchByEnum>;
export type TagSortByType = z.infer<typeof enums.TagSortByEnum>;
export type PostSearchByType = z.infer<typeof enums.PostSearchByEnum>;
export type PostSortByType = z.infer<typeof enums.PostSortByEnum>;
export type AuditAction = z.infer<typeof enums.AuditActionEnum>;
export type AuditLogSearchByType = z.infer<typeof enums.AuditLogSearchByEnum>;
export type AuditLogSortByType = z.infer<typeof enums.AuditLogSortByEnum>;
export type TrafficSourceSearchByType = z.infer<
  typeof enums.TrafficSourceSearchByEnum
>;
export type TrafficSourceSortByType = z.infer<
  typeof enums.TrafficSourceSortByEnum
>;
