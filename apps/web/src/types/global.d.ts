import type { IconMap } from "@/lib/icons";
import type { LucideIcon } from "lucide-react";

export type IconType = keyof typeof IconMap;

export type NavChild = {
  title: string;
  description: string;
  href: string;
  icon?: LucideIcon;
  image?: string;
};

export type NavItem = {
  title: string;
  href?: string;
  children: NavChild[];
  featured?: NavChild;
};
