import type { IconMap } from "@/lib/icons";
import type { LucideIcon } from "lucide-react";

declare global {
  type IconType = keyof typeof IconMap;

  type NavChild = {
    title: string;
    description: string;
    href: string;
    icon?: LucideIcon;
    image?: string;
  };

  type NavItem = {
    title: string;
    children: NavChild[];
    featured?: NavChild;
  };
}

export {};
