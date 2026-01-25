import { clsx, type ClassValue } from "clsx";
import ms, { StringValue } from "ms";
import { twMerge } from "tailwind-merge";

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
};

export const formatDate = (timeZone = "Asia/Karachi") => {
  const now = new Date();
  const formatted = now.toLocaleString("en-US", {
    timeZone,
    month: "short",
    day: "2-digit",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
    timeZoneName: "short",
  });

  return formatted;
};

export const slugify = (str: string, slug?: string) => {
  const base = slug && slug.trim().length > 0 ? slug : str;

  return base
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^\w\-]+/g, "")
    .replace(/\-\-+/g, "-")
    .replace(/^-+/, "")
    .replace(/-+$/, "");
};

export const parseExpiry = (exp: StringValue, future = false): number => {
  const val = ms(exp);
  if (future) return Date.now() + val;
  return val;
};

export const expiryDate = (exp: StringValue, future = false): Date => {
  const val = parseExpiry(exp, future);
  return new Date(val);
};
