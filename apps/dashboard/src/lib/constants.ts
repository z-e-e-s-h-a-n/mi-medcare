import {
  IconDashboard,
  IconUsers,
  IconSettings,
  IconPhoto,
  IconCategory,
  IconTags,
  IconFileText,
  IconRoute,
  IconHistory,
  IconAddressBook,
  IconFolder,
  IconUserCircle,
  IconNotification,
} from "@tabler/icons-react";
import type { NavGroup } from "@workspace/contracts";

export const sidebarMenu: NavGroup[] = [
  {
    items: [
      {
        label: "Dashboard",
        href: "/dashboard",
        icon: IconDashboard,
      },
    ],
  },

  {
    groupLabel: "MANAGEMENT",
    items: [
      {
        label: "Content",
        icon: IconFolder,
        children: [
          {
            label: "Posts",
            href: "/admin/content/posts",
            icon: IconFileText,
          },
          {
            label: "Tags",
            href: "/admin/content/tags",
            icon: IconTags,
          },
          {
            label: "Categories",
            href: "/admin/content/categories",
            icon: IconCategory,
          },
        ],
      },

      {
        label: "Leads",
        icon: IconAddressBook,
        children: [
          {
            label: "Newsletter",
            href: "/admin/leads/subscribers",
          },
          {
            label: "Consultations",
            href: "/admin/leads/requests",
          },
          {
            label: "Contact Messages",
            href: "/admin/leads/messages",
          },
        ],
      },

      {
        label: "Users",
        icon: IconUsers,
        children: [
          { label: "Users", href: "/admin/users" },
          { label: "Add User", href: "/admin/users/new" },
        ],
      },

      {
        label: "Media",
        href: "/media",
        icon: IconPhoto,
      },

      {
        label: "Traffic Sources",
        href: "/admin/traffic-sources",
        icon: IconRoute,
      },

      {
        label: "Audit Logs",
        href: "/admin/audit-logs",
        icon: IconHistory,
      },
    ],
  },

  {
    items: [
      {
        label: "Business Profile",
        href: "/settings",
        icon: IconSettings,
      },
    ],
  },
];

export const footerSidebarMenu: NavGroup[] = [
  {
    items: [
      {
        label: "Account",
        href: "/account",
        icon: IconUserCircle,
      },
      {
        label: "Notifications",
        href: "/notifications",
        icon: IconNotification,
      },
    ],
  },
];
