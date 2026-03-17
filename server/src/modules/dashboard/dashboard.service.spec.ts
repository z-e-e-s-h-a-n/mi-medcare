jest.mock("@/modules/prisma/prisma.service", () => ({
  PrismaService: class PrismaService {},
}));

import { DashboardService } from "./dashboard.service";

describe("DashboardService", () => {
  it("builds an overview payload from prisma data", async () => {
    const prisma = {
      user: {
        count: jest.fn().mockResolvedValue(5),
      },
      post: {
        count: jest.fn().mockResolvedValue(10),
        findMany: jest.fn().mockResolvedValue([
          {
            id: "post-1",
            title: "Denied Claims Recovery Checklist",
            slug: "denied-claims-recovery-checklist",
            status: "published",
            viewsCount: 320,
            publishedAt: new Date("2026-03-10T00:00:00.000Z"),
            author: { displayName: "Admin User" },
            category: { name: "RCM" },
          },
        ]),
        groupBy: jest.fn().mockResolvedValue([
          { status: "published", _count: { _all: 10 } },
          { status: "review", _count: { _all: 4 } },
          { status: "draft", _count: { _all: 2 } },
        ]),
      },
      postView: {
        count: jest.fn().mockResolvedValue(2400),
        findMany: jest.fn().mockResolvedValue([
          { viewedAt: new Date("2026-01-20T00:00:00.000Z") },
          { viewedAt: new Date("2026-01-20T00:00:00.000Z") },
          { viewedAt: new Date("2026-03-02T00:00:00.000Z") },
        ]),
      },
      contactMessage: {
        count: jest.fn().mockResolvedValue(49),
        findMany: jest
          .fn()
          .mockResolvedValueOnce([
            { createdAt: new Date("2026-01-01T00:00:00.000Z") },
          ])
          .mockResolvedValueOnce([
            {
              id: "contact-1",
              fullName: "Ava Carter",
              email: "ava@example.com",
              status: "new",
              createdAt: new Date("2026-03-17T00:00:00.000Z"),
            },
          ]),
      },
      consultationRequest: {
        count: jest.fn().mockResolvedValue(27),
        findMany: jest
          .fn()
          .mockResolvedValueOnce([
            { createdAt: new Date("2026-02-01T00:00:00.000Z") },
          ])
          .mockResolvedValueOnce([
            {
              id: "consultation-1",
              fullName: "Noah Bennett",
              practiceName: "Bennett Health",
              status: "review",
              createdAt: new Date("2026-03-16T00:00:00.000Z"),
            },
          ]),
      },
      newsletterSubscriber: {
        count: jest.fn().mockResolvedValue(63),
        findMany: jest
          .fn()
          .mockResolvedValueOnce([
            { subscribedAt: new Date("2026-03-01T00:00:00.000Z") },
          ])
          .mockResolvedValueOnce([
            {
              id: "subscriber-1",
              name: "Mia Turner",
              email: "mia@example.com",
              isActive: true,
              subscribedAt: new Date("2026-03-15T00:00:00.000Z"),
            },
          ]),
      },
      auditLog: {
        findMany: jest.fn().mockResolvedValue([
          {
            id: "audit-1",
            action: "create",
            entityType: "Post",
            entityId: "post-1",
            userId: "user-1",
            meta: { summary: "Created a new post" },
            ip: "127.0.0.1",
            userAgent: "jest",
            createdAt: new Date("2026-03-17T00:00:00.000Z"),
            user: {
              id: "user-1",
              firstName: "Admin",
              lastName: "User",
              displayName: "Admin User",
              email: "admin@example.com",
              phone: null,
            },
          },
        ]),
      },
    } as any;

    const service = new DashboardService(prisma);

    const result = await service.getOverview();

    expect(result.message).toBe("Dashboard overview fetched successfully.");
    expect(result.data.stats.users).toBe(5);
    expect(result.data.stats.leads.total).toBe(139);
    expect(result.data.charts.postViews).toHaveLength(90);
    expect(result.data.charts.leads).toHaveLength(6);
    expect(result.data.topPerformingPosts[0]?.title).toBe(
      "Denied Claims Recovery Checklist",
    );
    expect(result.data.recentLeads[0]?.type).toBe("contactMessage");
  });
});
