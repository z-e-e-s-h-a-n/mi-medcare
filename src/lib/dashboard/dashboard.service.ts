import prisma from "@lib/core/prisma";
import { PostStatus } from "@generated/prisma";

class DashboardService {
  /* =======================
   * DASHBOARD CARDS
   * ======================= */
  async getCardsStats() {
    const thisMonth = this.getMonthRange(0);
    const lastMonth = this.getMonthRange(-1);

    const [
      totalPosts,
      totalPostsLastMonth,

      publishedThisMonth,
      publishedLastMonth,

      reviewThisMonth,
      reviewLastMonth,

      viewsThisMonth,
      viewsLastMonth,
    ] = await Promise.all([
      // TOTAL POSTS
      prisma.post.count({ where: { deletedAt: null } }),
      prisma.post.count({
        where: {
          createdAt: { lt: thisMonth.start },
          deletedAt: null,
        },
      }),

      // PUBLISHED
      prisma.post.count({
        where: {
          status: PostStatus.published,
          createdAt: {
            gte: thisMonth.start,
            lt: thisMonth.end,
          },
          deletedAt: null,
        },
      }),
      prisma.post.count({
        where: {
          status: PostStatus.published,
          createdAt: {
            gte: lastMonth.start,
            lt: lastMonth.end,
          },
          deletedAt: null,
        },
      }),

      // REVIEW
      prisma.post.count({
        where: {
          status: PostStatus.review,
          createdAt: {
            gte: thisMonth.start,
            lt: thisMonth.end,
          },
          deletedAt: null,
        },
      }),
      prisma.post.count({
        where: {
          status: PostStatus.review,
          createdAt: {
            gte: lastMonth.start,
            lt: lastMonth.end,
          },
          deletedAt: null,
        },
      }),

      // VIEWS
      prisma.post.aggregate({
        _sum: { views: true },
        where: {
          status: PostStatus.published,
          createdAt: {
            gte: thisMonth.start,
            lt: thisMonth.end,
          },
          deletedAt: null,
        },
      }),
      prisma.post.aggregate({
        _sum: { views: true },
        where: {
          status: PostStatus.published,
          createdAt: {
            gte: lastMonth.start,
            lt: lastMonth.end,
          },
          deletedAt: null,
        },
      }),
    ]);

    const totalTrend = this.getPercentageChange(
      totalPosts,
      totalPostsLastMonth,
    );

    const publishedTrend = this.getPercentageChange(
      publishedThisMonth,
      publishedLastMonth,
    );

    const reviewTrend = this.getPercentageChange(
      reviewThisMonth,
      reviewLastMonth,
    );

    const viewsTrend = this.getPercentageChange(
      viewsThisMonth._sum.views ?? 0,
      viewsLastMonth._sum.views ?? 0,
    );

    return [
      {
        title: "Total Posts",
        value: totalPosts,
        badge: {
          value: this.formatBadge(totalTrend.value, totalTrend.trend),
          trend: totalTrend.trend,
        },
        footer: {
          title: this.pickByTrend(
            totalTrend.trend,
            `${publishedThisMonth} new posts this month`,
            "Posting activity declined",
          ),
          description: "Across all categories",
        },
      },

      {
        title: "Published",
        value: publishedThisMonth,
        badge: {
          value: this.formatBadge(publishedTrend.value, publishedTrend.trend),
          trend: publishedTrend.trend,
        },
        footer: {
          title: this.pickByTrend(
            publishedTrend.trend,
            "High publication rate",
            "Publication rate dropped",
          ),
          description: "Of total posts",
        },
      },

      {
        title: "Post in Review",
        value: reviewThisMonth,
        badge: {
          value: this.formatBadge(reviewTrend.value, reviewTrend.trend),
          trend: reviewTrend.trend,
        },
        footer: {
          title: this.pickByTrend(
            reviewTrend.trend,
            "Awaiting approval",
            "Fewer posts in review",
          ),
          description: "Editor review pending",
        },
      },

      {
        title: "Total Views",
        value: viewsThisMonth._sum.views ?? 0,
        badge: {
          value: this.formatBadge(viewsTrend.value, viewsTrend.trend),
          trend: viewsTrend.trend,
        },
        footer: {
          title: this.pickByTrend(
            viewsTrend.trend,
            "Growing engagement",
            "Engagement is down",
          ),
          description: "Across all published posts",
        },
      },
    ];
  }

  /* =======================
   * VISITORS / VIEWS (CHART)
   * ======================= */
  async getVisitorsStats() {
    const days = 90;
    const endDate = new Date();
    endDate.setHours(23, 59, 59, 999);

    const startDate = new Date();
    startDate.setDate(endDate.getDate() - days + 1);
    startDate.setHours(0, 0, 0, 0);

    const raw = await prisma.$queryRaw<{ date: Date; views: number }[]>`
    SELECT
      DATE("createdAt") as date,
      SUM("views") as views
    FROM "Post"
    WHERE
      "status" = 'published'
      AND "deletedAt" IS NULL
      AND "createdAt" BETWEEN ${startDate} AND ${endDate}
    GROUP BY DATE("createdAt")
    ORDER BY DATE("createdAt") ASC
  `;

    //
    const map = new Map(
      raw.map((r) => [r.date.toISOString().split("T")[0], Number(r.views)]),
    );

    const chartData: { date: string; views: number }[] = [];

    for (let i = 0; i < days; i++) {
      const d = new Date(startDate);
      d.setDate(startDate.getDate() + i);

      const key = d.toISOString().split("T")[0];

      chartData.push({
        date: key,
        views: map.get(key) ?? 0,
      });
    }

    return chartData;
  }

  /* =======================
   * RECENT POSTS
   * ======================= */
  async getRecentPosts(limit = 5) {
    const posts = await prisma.post.findMany({
      where: { deletedAt: null },
      orderBy: { createdAt: "desc" },
      take: limit,
      select: {
        id: true,
        title: true,
        slug: true,
        status: true,
        views: true,
        createdAt: true,
        author: { select: { displayName: true } },
        category: { select: { name: true } },
      },
    });

    return posts;
  }

  /* =======================
   * CONTENT OVERVIEW
   * ======================= */
  async getContentOverview() {
    const categories = await prisma.category.findMany({
      where: { deletedAt: null },
      select: {
        id: true,
        name: true,
        _count: {
          select: {
            posts: {
              where: { deletedAt: null },
            },
          },
        },
      },
      orderBy: {
        posts: {
          _count: "desc",
        },
      },
    });

    const tags = await prisma.tag.findMany({
      where: { deletedAt: null },
      select: {
        id: true,
        name: true,
        _count: {
          select: {
            posts: true,
          },
        },
      },
      orderBy: {
        posts: {
          _count: "desc",
        },
      },
      take: 10,
    });

    return {
      categories: categories.map((c) => ({
        id: c.id,
        name: c.name,
        postCount: c._count.posts,
      })),
      tags: tags.map((t) => ({
        id: t.id,
        name: t.name,
        postCount: t._count.posts,
      })),
    };
  }

  /* =======================
   * FULL DASHBOARD
   * ======================= */
  async getDashboardData() {
    const [cards, visitors, recentPosts, contentOverview] = await Promise.all([
      this.getCardsStats(),
      this.getVisitorsStats(),
      this.getRecentPosts(),
      this.getContentOverview(),
    ]);

    return {
      message: "Dashboard Data Fetched Successfully.",
      data: {
        cards,
        visitors,
        recentPosts,
        contentOverview,
      },
    };
  }

  private getPercentageChange(current: number, previous: number) {
    if (previous === 0 && current === 0) {
      return { value: 0, trend: "up" as const };
    }

    if (previous === 0) {
      return { value: 100, trend: "up" as const };
    }

    const diff = ((current - previous) / previous) * 100;

    return {
      value: Math.abs(Math.round(diff)),
      trend: diff >= 0 ? ("up" as const) : ("down" as const),
    };
  }

  private getMonthRange(offset = 0) {
    const start = new Date();
    start.setMonth(start.getMonth() + offset, 1);
    start.setHours(0, 0, 0, 0);

    const end = new Date(start);
    end.setMonth(end.getMonth() + 1);

    return { start, end };
  }

  private formatBadge(value: number, trend: "up" | "down") {
    const sign = trend === "up" ? "+" : "-";
    return `${sign}${value}%`;
  }

  private pickByTrend<T>(trend: "up" | "down", positive: T, negative: T): T {
    return trend === "up" ? positive : negative;
  }
}

export const dashboardService = new DashboardService();
