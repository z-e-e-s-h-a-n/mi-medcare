import z from "zod";

/* =========================
   SHARED - ENUMS
========================= */

export const ThemeModeEnum = z.enum(["system", "dark", "light"]);

export const BaseSortByEnum = z.enum(["createdAt"]);
export const SortOrderEnum = z.enum(["asc", "desc"]);

export const OtpTypeEnum = z.enum(["numericCode", "secureToken"]);
export const OtpPurposeEnum = z.enum([
  "setPassword",
  "resetPassword",
  "verifyEmail",
  "changeEmail",
]);

export const UserRoleEnum = z.enum(["admin", "author", "editor"]);
export const UserStatusEnum = z.enum(["pending", "active", "suspended"]);

export const UserSearchByEnum = z.enum(["id", "email", "displayName"]);
export const UserSortByEnum = z.enum(["lastLoginAt", "email", "displayName"]);

export const PostStatusEnum = z.enum(["draft", "review", "published"]);
export const PostSearchByEnum = z.enum([
  "id",
  "title",
  "slug",
  "author",
  "category",
]);
export const PostSortByEnum = z.enum([
  "publishedAt",
  "views",
  "title",
  "author",
  "category",
  "status",
]);

export const CategorySearchByEnum = z.enum(["id", "name", "slug"]);
export const CategorySortByEnum = z.enum(["name", "posts", "parent"]);

export const TagSearchByEnum = z.enum(["id", "name", "slug"]);
export const TagSortByEnum = z.enum(["name"]);

export const MediaSearchByEnum = z.enum(["id", "filename"]);
export const MediaSortByEnum = z.enum(["filename", "size"]);
