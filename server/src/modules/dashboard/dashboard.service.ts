import { Injectable } from "@nestjs/common";
import type { DashboardResponse } from "@workspace/contracts/dashboard";

import { PrismaService } from "@/modules/prisma/prisma.service";

const DAY_IN_MS = 24 * 60 * 60 * 1000;

@Injectable()
export class DashboardService {
  constructor(private readonly prisma: PrismaService) {}

  async getOverview(): Promise<{ message: string; data: DashboardResponse }> {
    const now = new Date();
    const postViewStart = new Date(now.getTime() - 89 * DAY_IN_MS);
    const leadStart = new Date(now);
    leadStart.setMonth(leadStart.getMonth() - 5);
    leadStart.setDate(1);
    leadStart.setHours(0, 0, 0, 0);

    const [
      users,
      publishedPosts,
      postViews,
      contactMessages,
      consultationRequests,
      newsletterSubscribers,
      recentAuditLogs,
      topPerformingPosts,
      recentContactMessages,
      recentConsultationRequests,
      recentNewsletterSubscribers,
      recentPostViews,
      recentLeadContactMessages,
      recentLeadConsultationRequests,
      recentLeadNewsletterSubscribers,
      postStatusGroups,
    ] = await Promise.all([
      this.prisma.user.count({ where: { deletedAt: null } }),
      this.prisma.post.count({
        where: { deletedAt: null, status: "published" },
      }),
      this.prisma.postView.count(),
      this.prisma.contactMessage.count({ where: { deletedAt: null } }),
      this.prisma.consultationRequest.count({ where: { deletedAt: null } }),
      this.prisma.newsletterSubscriber.count({ where: { deletedAt: null } }),
      this.prisma.auditLog.findMany({
        take: 8,
        orderBy: { createdAt: "desc" },
        include: { user: { omit: { password: true } } },
      }),
      this.prisma.post.findMany({
        where: { deletedAt: null },
        take: 8,
        orderBy: [{ viewsCount: "desc" }, { publishedAt: "desc" }],
        include: {
          author: { omit: { password: true } },
          category: true,
        },
      }),
      this.prisma.contactMessage.findMany({
        where: { createdAt: { gte: leadStart }, deletedAt: null },
        select: { createdAt: true },
      }),
      this.prisma.consultationRequest.findMany({
        where: { createdAt: { gte: leadStart }, deletedAt: null },
        select: { createdAt: true },
      }),
      this.prisma.newsletterSubscriber.findMany({
        where: { subscribedAt: { gte: leadStart }, deletedAt: null },
        select: { subscribedAt: true },
      }),
      this.prisma.postView.findMany({
        where: { viewedAt: { gte: postViewStart } },
        select: { viewedAt: true },
      }),
      this.prisma.contactMessage.findMany({
        where: { deletedAt: null },
        take: 6,
        orderBy: { createdAt: "desc" },
      }),
      this.prisma.consultationRequest.findMany({
        where: { deletedAt: null },
        take: 6,
        orderBy: { createdAt: "desc" },
      }),
      this.prisma.newsletterSubscriber.findMany({
        where: { deletedAt: null },
        take: 6,
        orderBy: { subscribedAt: "desc" },
      }),
      this.prisma.post.groupBy({
        by: ["status"],
        where: { deletedAt: null },
        _count: { _all: true },
      }),
    ]);

    const data: DashboardResponse = {
      stats: {
        users,
        publishedPosts,
        postViews,
        leads: {
          total:
            contactMessages + consultationRequests + newsletterSubscribers,
          contactMessages,
          consultationRequests,
          newsletterSubscribers,
        },
      },
      charts: {
        postViews: this.buildDailySeries(
          postViewStart,
          90,
          recentPostViews.map((item) => item.viewedAt),
        ),
        leads: this.buildLeadSeries({
          startDate: leadStart,
          contactMessages: recentContactMessages.map((item) => item.createdAt),
          consultationRequests: recentConsultationRequests.map(
            (item) => item.createdAt,
          ),
          newsletterSubscribers: recentNewsletterSubscribers.map(
            (item) => item.subscribedAt,
          ),
        }),
        postStatuses: [
          { label: "Published", value: 0 },
          { label: "Review", value: 0 },
          { label: "Draft", value: 0 },
        ].map((item) => ({
          ...item,
          value:
            postStatusGroups.find(
              (group) => group.status.toLowerCase() === item.label.toLowerCase(),
            )?._count._all ?? 0,
        })),
      },
      recentAuditLogs: recentAuditLogs.map((log) => ({
        id: log.id,
        action: log.action,
        entityType: log.entityType,
        entityId: log.entityId,
        userId: log.userId ?? undefined,
        meta:
          (log.meta ?? undefined) as DashboardResponse["recentAuditLogs"][number]["meta"],
        ip: log.ip ?? undefined,
        userAgent: log.userAgent ?? undefined,
        createdAt: log.createdAt.toISOString(),
        user: log.user
          ? {
              id: log.user.id,
              firstName: log.user.firstName,
              lastName: log.user.lastName ?? undefined,
              displayName: log.user.displayName,
              email: log.user.email ?? undefined,
              phone: log.user.phone ?? undefined,
            }
          : undefined,
      })),
      recentLeads: [
        ...recentLeadContactMessages.map((item) => ({
          id: item.id,
          type: "contactMessage" as const,
          title: item.fullName,
          subtitle: item.email,
          status: item.status,
          createdAt: item.createdAt.toISOString(),
        })),
        ...recentLeadConsultationRequests.map((item) => ({
          id: item.id,
          type: "consultationRequest" as const,
          title: item.fullName,
          subtitle: item.practiceName,
          status: item.status,
          createdAt: item.createdAt.toISOString(),
        })),
        ...recentLeadNewsletterSubscribers.map((item) => ({
          id: item.id,
          type: "newsletterSubscriber" as const,
          title: item.name,
          subtitle: item.email,
          status: item.isActive ? "active" : "inactive",
          createdAt: item.subscribedAt.toISOString(),
        })),
      ]
        .sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
        )
        .slice(0, 10),
      topPerformingPosts: topPerformingPosts.map((post) => ({
        id: post.id,
        title: post.title,
        slug: post.slug,
        status: post.status,
        viewsCount: post.viewsCount,
        publishedAt: post.publishedAt?.toISOString(),
        authorName: post.author.displayName,
        categoryName: post.category.name,
      })),
    };

    return {
      message: "Dashboard overview fetched successfully.",
      data,
    };
  }

  private buildDailySeries(
    startDate: Date,
    days: number,
    dates: Date[],
  ): DashboardResponse["charts"]["postViews"] {
    const bucket = new Map<string, number>();

    Array.from({ length: days }).forEach((_, index) => {
      const date = new Date(startDate.getTime() + index * DAY_IN_MS);
      bucket.set(this.toDateKey(date), 0);
    });

    dates.forEach((date) => {
      const key = this.toDateKey(date);
      if (bucket.has(key)) {
        bucket.set(key, (bucket.get(key) ?? 0) + 1);
      }
    });

    return Array.from(bucket.entries()).map(([date, value]) => ({ date, value }));
  }

  private buildLeadSeries(input: {
    startDate: Date;
    contactMessages: Date[];
    consultationRequests: Date[];
    newsletterSubscribers: Date[];
  }): DashboardResponse["charts"]["leads"] {
    const bucket = new Map<
      string,
      DashboardResponse["charts"]["leads"][number]
    >();

    Array.from({ length: 6 }).forEach((_, index) => {
      const date = new Date(input.startDate);
      date.setMonth(input.startDate.getMonth() + index);
      const key = this.toMonthKey(date);
      bucket.set(key, {
        date: key,
        contactMessages: 0,
        consultationRequests: 0,
        newsletterSubscribers: 0,
        total: 0,
      });
    });

    const increment = (
      values: Date[],
      field:
        | "contactMessages"
        | "consultationRequests"
        | "newsletterSubscribers",
    ) => {
      values.forEach((value) => {
        const key = this.toMonthKey(value);
        const current = bucket.get(key);
        if (!current) return;
        current[field] += 1;
        current.total += 1;
      });
    };

    increment(input.contactMessages, "contactMessages");
    increment(input.consultationRequests, "consultationRequests");
    increment(input.newsletterSubscribers, "newsletterSubscribers");

    return Array.from(bucket.values());
  }

  private toDateKey(value: Date) {
    return value.toISOString().slice(0, 10);
  }

  private toMonthKey(value: Date) {
    return value.toLocaleDateString("en-US", {
      month: "short",
      year: "2-digit",
      timeZone: "UTC",
    });
  }
}
