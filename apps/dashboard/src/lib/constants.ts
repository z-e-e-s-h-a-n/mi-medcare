import {
  IconDashboard,
  IconUsers,
  IconSettings,
  type Icon,
  IconPhoto,
  IconCategory,
  IconTags,
  IconFileText,
} from "@tabler/icons-react";

export type NavItem = {
  title: string;
  url?: string;
  icon?: Icon;
  children?: NavItem[];
};

export interface NavGroup {
  groupLabel?: string;
  items: NavItem[];
}

export const sidebarMenu: NavGroup[] = [
  {
    items: [
      {
        title: "Dashboard",
        url: "/dashboard",
        icon: IconDashboard,
      },
    ],
  },

  {
    groupLabel: "MANAGEMENT",
    items: [
      {
        title: "Users",
        icon: IconUsers,
        children: [
          { title: "Users", url: "/admin/users" },
          { title: "Add User", url: "/admin/users/new" },
        ],
      },

      {
        title: "Media",
        url: "/media",
        icon: IconPhoto,
      },

      {
        title: "Content",
        children: [
          {
            title: "Categories",
            url: "/admin/content/categories",
            icon: IconCategory,
          },
          {
            title: "Tags",
            url: "/admin/content/tags",
            icon: IconTags,
          },
          {
            title: "Pages",
            url: "/admin/content/pages",
            icon: IconFileText,
          },
          {
            title: "Posts",
            url: "/admin/content/posts",
            icon: IconFileText,
          },
        ],
      },

      {
        title: "Leads",
        children: [
          {
            title: "Contact Messages",
            url: "/admin/leads/contact",
          },
          {
            title: "Consultations",
            url: "/admin/leads/consultation",
          },
          {
            title: "Newsletter",
            url: "/admin/leads/newsletter",
          },
        ],
      },
    ],
  },

  {
    items: [
      {
        title: "Business Profile",
        url: "/settings",
        icon: IconSettings,
      },
    ],
  },
];
