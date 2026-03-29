/* eslint-disable @typescript-eslint/no-unused-vars */
import "dotenv/config";
import { createHash } from "crypto";
import { faker } from "@faker-js/faker";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../prisma/generated/client";
import {
  seedCategories,
  seedContent,
  seedPosts,
  seedTags,
} from "./seed.content";

const connectionString = process.env.DB_URI!;
const adapter = new PrismaPg({ connectionString });
const prisma = new PrismaClient({ adapter });

const now = new Date();
const DAY_IN_MS = 24 * 60 * 60 * 1000;

const USER_SEEDS = [
  {
    firstName: "Olivia",
    lastName: "Patel",
    email: "olivia.patel@mimedcare.com",
    role: "author",
    status: "active",
  },
  {
    firstName: "Noah",
    lastName: "Bennett",
    email: "noah.bennett@mimedcare.com",
    role: "author",
    status: "active",
  },
];

const PRACTICE_NAMES = [
  "Harbor Family Medicine",
  "Summit Pain & Spine",
  "Blue Oak Pediatrics",
  "Riverbend Internal Medicine",
  "Northside Cardiology Group",
  "Lakeside Urgent Care",
  "Crescent Women's Health",
  "Valley Orthopedic Specialists",
  "Evergreen Behavioral Health",
  "Metro Neurology Associates",
];

const LEAD_MONTHLY_COUNTS = {
  contactMessages: [4, 6, 7, 9, 11, 12],
  consultationRequests: [2, 3, 4, 5, 6, 7],
  newsletterSubscribers: [6, 7, 9, 11, 14, 16],
} as const;

const TRAFFIC_SOURCE_SEEDS = [
  {
    utmSource: "google",
    utmMedium: "organic",
    utmCampaign: "seo-medical-billing",
    landingPage: "/blogs/reduce-claim-denials",
    referrer: "https://www.google.com",
  },
  {
    utmSource: "google",
    utmMedium: "cpc",
    utmCampaign: "medical-billing-leads",
    landingPage: "/contact",
    referrer: "https://www.google.com",
  },
  {
    utmSource: "linkedin",
    utmMedium: "social",
    utmCampaign: "rcm-outsourcing-awareness",
    landingPage: "/services/revenue-cycle-management",
    referrer: "https://www.linkedin.com",
  },
  {
    utmSource: "email",
    utmMedium: "newsletter",
    utmCampaign: "quarterly-insights",
    landingPage: "/blogs/weekly-ar-review",
    referrer: null,
  },
  {
    utmSource: "facebook",
    utmMedium: "social",
    utmCampaign: "patient-access-campaign",
    landingPage: "/services/patient-access",
    referrer: "https://www.facebook.com",
  },
  {
    utmSource: "direct",
    utmMedium: null,
    utmCampaign: null,
    landingPage: "/",
    referrer: null,
  },
  {
    utmSource: "referral",
    utmMedium: "partner",
    utmCampaign: "practice-consultant-network",
    landingPage: "/consultation",
    referrer: "https://partner-network.example.com",
  },
  {
    utmSource: "bing",
    utmMedium: "organic",
    utmCampaign: "billing-outsourcing-search",
    landingPage: "/services/medical-billing",
    referrer: "https://www.bing.com",
  },
  {
    utmSource: "youtube",
    utmMedium: "video",
    utmCampaign: "practice-growth-education",
    landingPage: "/blogs/credentialing-delays-cash-flow",
    referrer: "https://www.youtube.com",
  },
  {
    utmSource: "instagram",
    utmMedium: "social",
    utmCampaign: "medical-practice-growth",
    landingPage: "/about",
    referrer: "https://www.instagram.com",
  },
  {
    utmSource: "google",
    utmMedium: "cpc",
    utmCampaign: "consultation-request",
    landingPage: "/consultation",
    referrer: "https://www.google.com",
  },
  {
    utmSource: "newsletter",
    utmMedium: "email",
    utmCampaign: "monthly-rcm-brief",
    landingPage: "/blogs/hipaa-safe-billing-workflows",
    referrer: null,
  },
];

async function hashPassword(password: string) {
  return createHash("sha256").update(password).digest("hex");
}

function randomEnum<T extends readonly string[]>(values: T): T[number] {
  return faker.helpers.arrayElement(values);
}

function randomDate(start: Date, end: Date) {
  return new Date(
    start.getTime() + Math.random() * (end.getTime() - start.getTime()),
  );
}

function daysAgo(days: number) {
  return new Date(now.getTime() - days * DAY_IN_MS);
}

function monthWindow(monthOffset: number) {
  const start = new Date(now.getFullYear(), now.getMonth() - monthOffset, 1);
  const end = new Date(now.getFullYear(), now.getMonth() - monthOffset + 1, 0);
  end.setHours(23, 59, 59, 999);
  return { start, end };
}

async function seedUsers() {
  console.log("Seeding users...");

  const password = await hashPassword("password123");

  const users = await Promise.all(
    USER_SEEDS.map(async (seed, index) =>
      prisma.user.create({
        data: {
          firstName: seed.firstName,
          lastName: seed.lastName,
          displayName: `${seed.firstName} ${seed.lastName}`,
          email: seed.email,
          password,
          role: seed.role as any,
          status: seed.status as any,
          isEmailVerified: true,
          preferredTheme: randomEnum(["light", "dark", "system"]) as any,
          pushNotifications: index < 3,
          loginAlerts: true,
          lastLoginAt:
            seed.status === "active" ? randomDate(daysAgo(20), now) : null,
        },
      }),
    ),
  );

  console.log(`Created ${users.length} users`);

  return { users };
}

async function seedTrafficSources() {
  console.log("Seeding traffic sources...");

  const sources = [];
  for (const source of TRAFFIC_SOURCE_SEEDS) {
    sources.push(
      await prisma.trafficSource.create({
        data: {
          ...source,
          utmTerm: faker.datatype.boolean(0.45) ? faker.lorem.word() : null,
          utmContent: faker.datatype.boolean(0.35)
            ? faker.lorem.words(2)
            : null,
          ip: faker.internet.ip(),
          userAgent: faker.internet.userAgent(),
          createdAt: randomDate(daysAgo(95), now),
        },
      }),
    );
  }

  console.log(`Created ${sources.length} traffic sources`);
  return sources;
}

async function seedPostViews(posts: any[], trafficSources: any[]) {
  console.log("Seeding post views...");

  let totalViews = 0;

  for (const post of posts) {
    let createdViews = 0;

    if (post.status === "published") {
      for (let index = 0; index < post.seedViewTarget; index++) {
        const weightedDaysAgo = Math.floor(Math.pow(Math.random(), 1.8) * 90);
        const viewedAt = randomDate(daysAgo(weightedDaysAgo), now);
        const viewedOn = new Date(viewedAt);
        viewedOn.setUTCHours(0, 0, 0, 0);
        await prisma.postView.create({
          data: {
            postId: post.id,
            trafficSourceId:
              Math.random() < 0.85
                ? faker.helpers.arrayElement(trafficSources).id
                : null,
            visitorKey: faker.string.alphanumeric(32),
            viewedOn,
            viewedAt,
          },
        });
        createdViews += 1;
      }
    }

    await prisma.post.update({
      where: { id: post.id },
      data: { viewsCount: createdViews },
    });

    totalViews += createdViews;
  }

  console.log(`Created ${totalViews} post views`);
}

async function seedSessions(users: any[]) {
  console.log("Seeding sessions...");

  const sessions = [];
  for (const user of users) {
    const sessionCount = faker.number.int({ min: 1, max: 3 });

    for (let index = 0; index < sessionCount; index++) {
      const status = randomEnum(["active", "revoked", "expired"]);
      const createdAt = randomDate(daysAgo(40), now);
      const expiresAt = new Date(createdAt.getTime() + 14 * DAY_IN_MS);

      sessions.push(
        await prisma.session.create({
          data: {
            userId: user.id,
            refreshTokenHash: faker.string.alphanumeric(64),
            status: status as any,
            ip: faker.internet.ip(),
            location: `${faker.location.city()}, ${faker.location.state()}`,
            isp: faker.company.name(),
            timezone: faker.location.timeZone(),
            deviceId: faker.string.uuid(),
            deviceType: faker.helpers.arrayElement([
              "desktop",
              "laptop",
              "tablet",
            ]),
            deviceInfo: faker.helpers.arrayElement([
              "Chrome on Windows",
              "Safari on macOS",
              "Edge on Windows",
              "Chrome on Android",
            ]),
            isTrusted: faker.datatype.boolean(0.6),
            lastSeenAt:
              status === "active"
                ? randomDate(createdAt, now)
                : randomDate(createdAt, expiresAt),
            expiresAt,
            revokedAt:
              status === "revoked" ? randomDate(createdAt, daysAgo(1)) : null,
            pushProvider:
              user.pushNotifications && faker.datatype.boolean(0.5)
                ? (randomEnum(["fcm", "expo"]) as any)
                : null,
            pushToken:
              user.pushNotifications && faker.datatype.boolean(0.5)
                ? faker.string.alphanumeric(64)
                : null,
          },
        }),
      );
    }
  }

  console.log(`Created ${sessions.length} sessions`);
  return sessions;
}

async function seedOtps(users: any[]) {
  console.log("Seeding OTPs...");

  const purposes = [
    "setPassword",
    "resetPassword",
    "updatePassword",
    "verifyEmail",
    "updateEmail",
    "enableMfa",
    "disableMfa",
    "updateMfa",
    "verifyMfa",
  ] as const;

  const otps = [];
  for (const user of users) {
    const otpCount = faker.number.int({ min: 1, max: 3 });
    for (let index = 0; index < otpCount; index++) {
      const createdAt = randomDate(daysAgo(10), now);
      const expiresAt = new Date(createdAt.getTime() + 15 * 60 * 1000);

      otps.push(
        await prisma.otp.create({
          data: {
            userId: user.id,
            purpose: randomEnum(purposes),
            type: randomEnum(["numericCode", "secureToken"]) as any,
            secret: faker.string.alphanumeric(32),
            meta: { ip: faker.internet.ip() } as any,
            createdAt,
            updatedAt: createdAt,
            expiresAt,
            usedAt: faker.datatype.boolean(0.45)
              ? randomDate(createdAt, expiresAt)
              : null,
          },
        }),
      );
    }
  }

  console.log(`Created ${otps.length} OTPs`);
  return otps;
}

async function seedNotifications(users: any[]) {
  console.log("Seeding notifications...");

  const notifications = [];
  const purposes = [
    "signUp",
    "signIn",
    "verifyMfa",
    "updateMfa",
    "updatePassword",
    "verifyEmail",
    "updateEmail",
    "userStatus",
    "newsletter",
    "securityAlert",
    "contactMessage",
    "consultationRequest",
  ] as const;

  for (const user of users) {
    const notificationCount = faker.number.int({ min: 3, max: 6 });

    for (let index = 0; index < notificationCount; index++) {
      const purpose = randomEnum(purposes);
      const createdAt = randomDate(daysAgo(21), now);
      const channels = [
        "email",
        ...(user.pushNotifications && faker.datatype.boolean(0.5)
          ? ["push"]
          : []),
      ] as ("email" | "push")[];
      const status = randomEnum(["sent", "sent", "sent", "failed"]);

      notifications.push(
        await prisma.notification.create({
          data: {
            userId: user.id,
            purpose,
            channels,
            title: faker.helpers.arrayElement([
              "New dashboard activity",
              "Account security update",
              "Lead follow-up reminder",
              "Content review notification",
            ]),
            message: faker.helpers.arrayElement([
              "A new action was recorded on your account.",
              "A lead has moved to the next review stage.",
              "A post is ready for review in the dashboard.",
              "Please review the latest security-related activity.",
            ]),
            recipient: user.email!,
            meta: { source: "seed", purpose } as any,
            status: status as any,
            readAt:
              status === "sent" && faker.datatype.boolean(0.55)
                ? randomDate(createdAt, now)
                : null,
            createdAt,
            updatedAt: createdAt,
          },
        }),
      );
    }
  }

  console.log(`Created ${notifications.length} notifications`);
  return notifications;
}

async function seedContactMessages(trafficSources: any[]) {
  console.log("Seeding contact messages...");

  const messages = [];

  for (let monthOffset = 5; monthOffset >= 0; monthOffset--) {
    const { start, end } = monthWindow(monthOffset);
    const count = LEAD_MONTHLY_COUNTS.contactMessages[5 - monthOffset];

    for (let index = 0; index < count; index++) {
      const createdAt = randomDate(start, end);
      const status = randomEnum(["pending", "viewed", "replied"]);
      const viewedAt = status !== "pending" ? randomDate(createdAt, now) : null;
      const repliedAt =
        status === "replied" && viewedAt ? randomDate(viewedAt, now) : null;

      messages.push(
        await prisma.contactMessage.create({
          data: {
            trafficSourceId: faker.helpers.arrayElement(trafficSources).id,
            fullName: faker.person.fullName(),
            practiceName: faker.helpers.arrayElement(PRACTICE_NAMES),
            email: faker.internet.email().toLowerCase(),
            phone: faker.phone.number(),
            practiceType: randomEnum([
              "privatePractice",
              "groupPractice",
              "hospital",
              "clinic",
              "urgentCare",
              "specialtyClinic",
            ]) as any,
            bestContactTime: randomEnum([
              "morning",
              "afternoon",
              "evening",
              "anytime",
            ]) as any,
            message: faker.helpers.arrayElement([
              "We want to improve our denial management process and get better visibility into claims aging.",
              "Our team needs help with billing follow-up and reducing payment delays across commercial payers.",
              "We are exploring outsourced billing support for a growing specialty practice.",
            ]),
            status: status as any,
            notes:
              status === "replied"
                ? "Initial outreach completed and follow-up scheduled."
                : status === "viewed"
                  ? "Reviewed by operations team."
                  : null,
            viewedAt,
            repliedAt,
            createdAt,
            updatedAt: repliedAt ?? viewedAt ?? createdAt,
          },
        }),
      );
    }
  }

  console.log(`Created ${messages.length} contact messages`);
  return messages;
}

async function seedConsultationRequests(trafficSources: any[]) {
  console.log("Seeding consultation requests...");

  const requests = [];

  for (let monthOffset = 5; monthOffset >= 0; monthOffset--) {
    const { start, end } = monthWindow(monthOffset);
    const count = LEAD_MONTHLY_COUNTS.consultationRequests[5 - monthOffset];

    for (let index = 0; index < count; index++) {
      const createdAt = randomDate(start, end);
      const status = randomEnum(["new", "contacted", "qualified", "closed"]);

      requests.push(
        await prisma.consultationRequest.create({
          data: {
            trafficSourceId: faker.helpers.arrayElement(trafficSources).id,
            fullName: faker.person.fullName(),
            practiceName: faker.helpers.arrayElement(PRACTICE_NAMES),
            email: faker.internet.email().toLowerCase(),
            phone: faker.phone.number(),
            practiceType: randomEnum([
              "privatePractice",
              "groupPractice",
              "hospital",
              "clinic",
              "urgentCare",
              "specialtyClinic",
            ]) as any,
            monthlyClaims: randomEnum([
              "range_0_250",
              "range_251_1000",
              "range_1001_3000",
              "range_3000_plus",
            ]) as any,
            message: faker.helpers.arrayElement([
              "We need a consultation on billing operations, claim cleanup, and AR recovery strategy.",
              "Our practice is growing and we want support with coding review, claim submission, and reporting.",
              "We are looking for an RCM partner that can improve collections and reporting across multiple providers.",
            ]),
            status: status as any,
            notes:
              status === "new"
                ? null
                : faker.helpers.arrayElement([
                    "Discovery call completed and next-step notes recorded.",
                    "Qualified opportunity with follow-up proposal scheduled.",
                    "Practice requested additional pricing details.",
                  ]),
            createdAt,
            updatedAt: randomDate(createdAt, now),
          },
        }),
      );
    }
  }

  console.log(`Created ${requests.length} consultation requests`);
  return requests;
}

async function seedNewsletterSubscribers(trafficSources: any[]) {
  console.log("Seeding newsletter subscribers...");

  const subscribers = [];

  for (let monthOffset = 5; monthOffset >= 0; monthOffset--) {
    const { start, end } = monthWindow(monthOffset);
    const count = LEAD_MONTHLY_COUNTS.newsletterSubscribers[5 - monthOffset];

    for (let index = 0; index < count; index++) {
      const subscribedAt = randomDate(start, end);
      const isActive = faker.datatype.boolean(0.82);
      const unsubscribedAt = isActive ? null : randomDate(subscribedAt, now);

      subscribers.push(
        await prisma.newsletterSubscriber.create({
          data: {
            trafficSourceId: faker.helpers.arrayElement(trafficSources).id,
            name: faker.person.fullName(),
            email: faker.internet.email().toLowerCase(),
            isActive,
            subscribedAt,
            unsubscribedAt,
            createdAt: subscribedAt,
            updatedAt: unsubscribedAt ?? subscribedAt,
          },
        }),
      );
    }
  }

  console.log(`Created ${subscribers.length} newsletter subscribers`);
  return subscribers;
}

async function seedAuditLogs(users: any[], posts: any[]) {
  console.log("Seeding audit logs...");

  const logs = [];
  const entitySeeds = [
    {
      entityType: "User",
      actions: ["login", "logout", "update", "statusChange"],
      resolveEntityId: () => faker.helpers.arrayElement(users).id,
    },
    {
      entityType: "Post",
      actions: ["create", "update", "statusChange", "delete"],
      resolveEntityId: () => faker.helpers.arrayElement(posts).id,
    },
    {
      entityType: "Category",
      actions: ["create", "update"],
      resolveEntityId: () => faker.string.ulid(),
    },
    {
      entityType: "Media",
      actions: ["create", "update", "delete"],
      resolveEntityId: () => faker.string.ulid(),
    },
    {
      entityType: "ContactMessage",
      actions: ["create", "update", "statusChange"],
      resolveEntityId: () => faker.string.uuid(),
    },
    {
      entityType: "ConsultationRequest",
      actions: ["create", "update", "statusChange", "delete"],
      resolveEntityId: () => faker.string.ulid(),
    },
    {
      entityType: "NewsletterSubscriber",
      actions: ["create", "statusChange", "delete"],
      resolveEntityId: () => faker.string.uuid(),
    },
  ] as const;

  for (let index = 0; index < 32; index++) {
    const user = faker.helpers.arrayElement(users);
    const entitySeed = faker.helpers.arrayElement(entitySeeds);
    const createdAt = randomDate(daysAgo(45), now);
    const action = randomEnum(entitySeed.actions);

    logs.push(
      await prisma.auditLog.create({
        data: {
          userId: user.id,
          action: action as any,
          entityType: entitySeed.entityType,
          entityId: entitySeed.resolveEntityId(),
          meta: {
            source: "seed",
            summary: faker.helpers.arrayElement([
              "Dashboard action recorded for review.",
              "Administrative update captured successfully.",
              "Content workflow event added to history.",
            ]),
          } as any,
          ip: faker.internet.ip(),
          userAgent: faker.internet.userAgent(),
          createdAt,
        },
      }),
    );
  }

  console.log(`Created ${logs.length} audit logs`);
  return logs;
}

async function main() {
  console.log("Starting seeding...");

  try {
    const { users } = await seedUsers();
    const categories = await seedCategories();
    const tags = await seedTags();
    const posts = await seedPosts(users[0].id, categories, tags);
    const trafficSources = await seedTrafficSources();

    await seedPostViews(posts, trafficSources);
    await seedSessions(users);
    await seedOtps(users);
    await seedNotifications(users);
    await seedContactMessages(trafficSources);
    await seedConsultationRequests(trafficSources);
    await seedNewsletterSubscribers(trafficSources);
    await seedAuditLogs(users, posts);

    console.log("All seeding completed successfully");
  } catch (error) {
    console.error("Seeding failed:", error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

void main();
