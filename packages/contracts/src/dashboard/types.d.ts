import type { AuditLogResponse } from "../audit/types";
import type { PostResponse } from "../content/types";

export interface DashboardStatBlock {
  users: number;
  publishedPosts: number;
  postViews: number;
  leads: {
    total: number;
    contactMessages: number;
    consultationRequests: number;
    newsletterSubscribers: number;
  };
}

export interface DashboardTimelinePoint {
  date: string;
  value: number;
}

export interface DashboardLeadTimelinePoint {
  date: string;
  contactMessages: number;
  consultationRequests: number;
  newsletterSubscribers: number;
  total: number;
}

export interface DashboardBreakdownPoint {
  label: string;
  value: number;
}

export interface DashboardLeadItem {
  id: string;
  type: "contactMessage" | "consultationRequest" | "newsletterSubscriber";
  title: string;
  subtitle: string;
  status: string;
  createdAt: string;
}

export interface TopPerformingPost
  extends Pick<
    PostResponse,
    "id" | "title" | "slug" | "status" | "viewsCount" | "publishedAt"
  > {
  authorName: string;
  categoryName: string;
}

export interface ContentOverviewCategoryItem {
  id: string;
  name: string;
  slug: string;
  postCount: number;
}

export interface ContentOverviewTagItem {
  id: string;
  name: string;
  slug: string;
  postCount: number;
}

export interface DashboardResponse {
  stats: DashboardStatBlock;
  charts: {
    postViews: DashboardTimelinePoint[];
    leads: DashboardLeadTimelinePoint[];
    postStatuses: DashboardBreakdownPoint[];
  };
  recentAuditLogs: AuditLogResponse[];
  recentLeads: DashboardLeadItem[];
  contentOverview: {
    posts: TopPerformingPost[];
    categories: ContentOverviewCategoryItem[];
    tags: ContentOverviewTagItem[];
  };
}
