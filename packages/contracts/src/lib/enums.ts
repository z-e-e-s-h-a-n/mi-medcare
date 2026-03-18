import { z } from "zod";
import * as $Enums from "@workspace/db/enums";

/* =========================
   SHARED - ENUMS
========================= */

export const SortOrderEnum = z.enum(["asc", "desc"]);
export const ChartRangeEnum = z.enum(["7d", "30d", "90d"]);
export const ThemeModeEnum = z.enum($Enums.ThemeMode);

export const OtpTypeEnum = z.enum($Enums.OtpType);
export const OtpPurposeEnum = z.enum($Enums.OtpPurpose);

export const MfaMethodEnum = z.enum($Enums.MfaMethod);
export const SessionStatusEnum = z.enum($Enums.SessionStatus);

export const PushProviderEnum = z.enum($Enums.PushProvider);
export const NotificationChannelEnum = z.enum($Enums.NotificationChannel);
export const NotificationPurposeEnum = z.enum($Enums.NotificationPurpose);
export const NotificationStatusEnum = z.enum($Enums.NotificationStatus);

/* =========================
   SHARED - VARIABLES
========================= */

export const BaseSortByEnum = z.enum(["createdAt"]);

/* =========================
   USER
========================= */
export const UserRoleEnum = z.enum($Enums.UserRole);
export const UserStatusEnum = z.enum($Enums.UserStatus);

export const UserSearchByEnum = z.enum(["id", "email", "displayName"]);
export const UserSortByEnum = z.enum([
  "email",
  "role",
  "status",
  "displayName",
  "lastLoginAt",
]);

// =========================
// MEDIA
// =========================

export const MediaTypeEnum = z.enum($Enums.MediaType);
export const MediaVisibilityEnum = z.enum($Enums.MediaVisibility);

export const MediaSearchByEnum = z.enum(["id", "title"]);
export const MediaSortByEnum = z.enum(["size", "title", "type"]);

/* =========================
   CONTACT / CONSULTATION
========================= */
export const PracticeTypeEnum = z.enum($Enums.PracticeType);
export const ConsultationRequestStatusEnum = z.enum(
  $Enums.ConsultationRequestStatus,
);
export const MonthlyClaimsRangeEnum = z.enum($Enums.MonthlyClaimsRange);

export const ContactMessageStatusEnum = z.enum($Enums.ContactMessageStatus);
export const ContactTimePreferenceEnum = z.enum($Enums.ContactTimePreference);

export const ContactMessageSortByEnum = z.enum([
  "fullName",
  "practiceName",
  "email",
  "phone",
  "repliedAt",
]);

export const ContactMessageSearchByEnum = z.enum([
  "name",
  "practiceName",
  "email",
  "phone",
  "practiceType",
  "bestContactTime",
]);

export const ConsultationRequestSortByEnum = z.enum([
  "fullName",
  "practiceName",
  "email",
  "phone",
  "practiceType",
]);

export const ConsultationRequestSearchByEnum = z.enum([
  "name",
  "practiceName",
  "email",
  "phone",
  "practiceType",
]);

/* =========================
   NEWSLETTER SUBSCRIBER
========================= */
export const NewsletterSubscriberSortByEnum = z.enum([
  "name",
  "email",
  "subscribedAt",
  "unsubscribedAt",
]);

export const NewsletterSubscriberSearchByEnum = z.enum(["name", "email"]);

/* =========================
   CONTENT
========================= */

export const PostStatusEnum = z.enum($Enums.PostStatus);
export const CategorySearchByEnum = z.enum(["id", "name", "slug"]);
export const CategorySortByEnum = z.enum(["name", "slug", "updatedAt"]);

export const TagSearchByEnum = z.enum(["id", "name", "slug"]);
export const TagSortByEnum = z.enum(["name", "slug", "updatedAt"]);

export const PostSearchByEnum = z.enum([
  "id",
  "title",
  "slug",
  "category",
  "tags",
]);
export const PostSortByEnum = z.enum([
  "title",
  "slug",
  "updatedAt",
  "publishedAt",
  "viewsCount",
]);

/* =========================
   SYSTEM
========================= */

export const AuditActionEnum = z.enum($Enums.AuditAction);
export const AuditLogSearchByEnum = z.enum([
  "userId",
  "entityType",
  "entityId",
]);
export const AuditLogSortByEnum = z.enum(["createdAt", "entityType"]);

export const TrafficSourceSearchByEnum = z.enum([
  "utmSource",
  "utmMedium",
  "utmCampaign",
  "referrer",
  "landingPage",
]);
export const TrafficSourceSortByEnum = z.enum(["createdAt"]);
