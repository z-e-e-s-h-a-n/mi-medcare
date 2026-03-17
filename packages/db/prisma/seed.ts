import "dotenv/config";
import { PrismaClient } from "../prisma/generated/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { faker } from "@faker-js/faker";
import { createHash } from "crypto";

const connectionString = process.env.DB_URI!;
const adapter = new PrismaPg({ connectionString });
const prisma = new PrismaClient({ adapter });

const SALT_ROUNDS = 10;

// ----------------------------------------------------------------------
// Helper: hash password
async function hashPassword(password: string) {
  return createHash("sha256").update(password).digest("hex");
}

// ----------------------------------------------------------------------
// Helper: random enum value
function randomEnum<T extends object>(anEnum: T) {
  const enumValues = Object.values(anEnum) as unknown as T[keyof T][];
  const randomIndex = Math.floor(Math.random() * enumValues.length);
  return enumValues[randomIndex] as any;
}

// ----------------------------------------------------------------------
// Helper: random date between now and past/future
function randomDate(start: Date, end: Date) {
  return new Date(
    start.getTime() + Math.random() * (end.getTime() - start.getTime()),
  );
}

// ----------------------------------------------------------------------
// SEED FUNCTIONS

async function seedUsers() {
  console.log("👥 Seeding users...");

  const password = await hashPassword("password123");

  // Create authors
  const authors = await Promise.all(
    Array.from({ length: 3 }).map(async (_, i) => {
      const firstName = faker.person.firstName();
      const lastName = faker.person.lastName();
      return prisma.user.create({
        data: {
          firstName,
          lastName,
          displayName: `${firstName} ${lastName}`,
          email: faker.internet.email({ firstName, lastName }).toLowerCase(),
          phone: faker.phone.number(),
          password,
          role: "author",
          status: "active",
          isEmailVerified: faker.datatype.boolean(0.8),
          isPhoneVerified: faker.datatype.boolean(0.6),
          preferredTheme: randomEnum(["light", "dark", "system"]),
          pushNotifications: faker.datatype.boolean(),
          loginAlerts: faker.datatype.boolean(),
        },
      });
    }),
  );

  // Create editors
  const editors = await Promise.all(
    Array.from({ length: 2 }).map(async (_, i) => {
      const firstName = faker.person.firstName();
      const lastName = faker.person.lastName();
      return prisma.user.create({
        data: {
          firstName,
          lastName,
          displayName: `${firstName} ${lastName}`,
          email: faker.internet.email({ firstName, lastName }).toLowerCase(),
          phone: faker.phone.number(),
          password,
          role: "editor",
          status: "active",
          isEmailVerified: true,
          isPhoneVerified: true,
        },
      });
    }),
  );

  const allUsers = [...authors, ...editors];
  console.log(`✅ Created ${allUsers.length} users`);
  return { authors, editors, allUsers };
}

async function seedMedia(users: any[]) {
  console.log("🖼️ Seeding media...");

  const mediaItems = [];
  for (const user of users.slice(0, 5)) {
    // only for first 5 users
    const count = faker.number.int({ min: 1, max: 3 });
    for (let j = 0; j < count; j++) {
      const type = randomEnum(["photo", "logo", "other"]);
      const visibility = randomEnum(["private", "public"]);
      const media = await prisma.media.create({
        data: {
          uploadedById: user.id,
          url: faker.image.urlPicsumPhotos({ width: 640, height: 480 }),
          filename: faker.system.fileName(),
          mimeType: "image/jpeg",
          size: faker.number.int({ min: 10000, max: 5000000 }),
          hash: faker.string.alphanumeric(64),
          title: faker.lorem.words(3),
          altText: faker.lorem.sentence(),
          type,
          visibility,
          notes: faker.datatype.boolean(0.3) ? faker.lorem.sentence() : null,
        },
      });
      mediaItems.push(media);
    }
  }
  console.log(`✅ Created ${mediaItems.length} media items`);
  return mediaItems;
}

async function seedCategories() {
  console.log("📂 Seeding categories...");

  const categories = [];
  const parentCategories = [
    {
      name: "Technology",
      slug: "technology",
      description: "Tech news and articles",
    },
    { name: "Travel", slug: "travel", description: "Travel guides and tips" },
    { name: "Health", slug: "health", description: "Health and wellness" },
  ];

  for (const parent of parentCategories) {
    const cat = await prisma.category.create({
      data: {
        name: parent.name,
        slug: parent.slug,
        description: parent.description,
      },
    });
    categories.push(cat);

    // add subcategories
    const subCount = faker.number.int({ min: 2, max: 4 });
    for (let i = 0; i < subCount; i++) {
      const subName = faker.commerce.department();
      const sub = await prisma.category.create({
        data: {
          name: subName,
          slug: faker.helpers.slugify(subName).toLowerCase(),
          description: faker.lorem.sentence(),
          parentId: cat.id,
        },
      });
      categories.push(sub);
    }
  }
  console.log(`✅ Created ${categories.length} categories`);
  return categories;
}

async function seedTags() {
  console.log("🏷️ Seeding tags...");

  const tagNames = [
    "javascript",
    "react",
    "nodejs",
    "typescript",
    "mongodb",
    "prisma",
    "graphql",
    "rest-api",
    "docker",
    "devops",
    "travel-tips",
    "budget-travel",
    "wellness",
    "fitness",
    "nutrition",
  ];

  const tags = await Promise.all(
    tagNames.map(async (name) => {
      return prisma.tag.create({
        data: {
          name,
          slug: name.toLowerCase().replace(/\s+/g, "-"),
        },
      });
    }),
  );
  console.log(`✅ Created ${tags.length} tags`);
  return tags;
}

async function seedPosts(
  users: any[],
  categories: any[],
  tags: any[],
  media: any[],
) {
  console.log("✍️ Seeding posts...");

  const authors = users.filter((u) => u.role === "author");
  const posts = [];

  for (let i = 0; i < 15; i++) {
    const author = authors[Math.floor(Math.random() * authors.length)];
    const category = categories[Math.floor(Math.random() * categories.length)];
    const cover = media[Math.floor(Math.random() * media.length)];

    const status = randomEnum(["draft", "review", "published"]);
    const publishedAt =
      status === "published"
        ? randomDate(new Date(2023, 0, 1), new Date())
        : null;

    const title = faker.lorem.sentence({ min: 3, max: 8 });
    const slug =
      faker.helpers.slugify(title).toLowerCase() +
      "-" +
      faker.string.alphanumeric(5);

    const post = await prisma.post.create({
      data: {
        authorId: author.id,
        categoryId: category.id,
        title,
        slug,
        excerpt: faker.lorem.paragraph(),
        content: faker.lorem.paragraphs(5),
        coverId: faker.datatype.boolean(0.7) ? cover.id : null,
        status,
        publishedAt,
        metaTitle: faker.lorem.words(5),
        metaDescription: faker.lorem.sentence(),
        viewsCount: faker.number.int({ min: 0, max: 1000 }),
        tags: {
          connect: faker.helpers
            .arrayElements(tags, { min: 1, max: 4 })
            .map((t: any) => ({ id: t.id })),
        },
      },
    });
    posts.push(post);

    // Create some post views
    const viewCount = faker.number.int({ min: 0, max: 20 });
    for (let v = 0; v < viewCount; v++) {
      await prisma.postView.create({
        data: {
          postId: post.id,
          viewedAt: randomDate(post.createdAt, new Date()),
        },
      });
    }
  }
  console.log(`✅ Created ${posts.length} posts`);
  return posts;
}

async function seedSessions(users: any[]) {
  console.log("🔑 Seeding sessions...");

  const sessions = [];
  for (const user of users.slice(0, 8)) {
    const sessionCount = faker.number.int({ min: 0, max: 3 });
    for (let s = 0; s < sessionCount; s++) {
      const expiresAt = randomDate(
        new Date(),
        new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
      );
      const status = randomEnum(["active", "revoked", "expired"]);
      const session = await prisma.session.create({
        data: {
          userId: user.id,
          refreshTokenHash: faker.string.alphanumeric(64),
          status,
          ip: faker.internet.ip(),
          location: faker.location.city(),
          isp: faker.company.name(),
          timezone: faker.location.timeZone(),
          deviceId: faker.string.uuid(),
          deviceType: faker.helpers.arrayElement([
            "mobile",
            "tablet",
            "desktop",
          ]),
          deviceInfo: faker.helpers.arrayElement([
            "Chrome",
            "Firefox",
            "Safari",
            "Edge",
          ]),
          isTrusted: faker.datatype.boolean(0.3),
          lastSeenAt: faker.datatype.boolean()
            ? randomDate(
                new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
                new Date(),
              )
            : null,
          expiresAt,
          revokedAt:
            status === "revoked"
              ? randomDate(
                  new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
                  new Date(),
                )
              : null,
          pushProvider: faker.datatype.boolean(0.2)
            ? randomEnum(["fcm", "expo"])
            : null,
          pushToken: faker.datatype.boolean(0.2)
            ? faker.string.alphanumeric(64)
            : null,
        },
      });
      sessions.push(session);
    }
  }
  console.log(`✅ Created ${sessions.length} sessions`);
  return sessions;
}

async function seedOtps(users: any[]) {
  console.log("🔐 Seeding OTPs...");

  const otps = [];
  for (const user of users.slice(0, 10)) {
    const otpCount = faker.number.int({ min: 0, max: 4 });
    for (let o = 0; o < otpCount; o++) {
      const purpose = randomEnum([
        "setPassword",
        "resetPassword",
        "updatePassword",
        "verifyEmail",
        "updateEmail",
        "enableMfa",
        "disableMfa",
        "updateMfa",
        "verifyMfa",
      ]);
      const type = randomEnum(["numericCode", "secureToken"]);
      const expiresAt = randomDate(
        new Date(),
        new Date(Date.now() + 15 * 60 * 1000),
      ); // 15 min max
      const usedAt = faker.datatype.boolean(0.3)
        ? randomDate(new Date(Date.now() - 24 * 60 * 60 * 1000), new Date())
        : null;

      const otp = await prisma.otp.create({
        data: {
          userId: user.id,
          purpose,
          type,
          secret: faker.string.alphanumeric(32),
          meta: faker.datatype.boolean()
            ? ({ ip: faker.internet.ip() } as any)
            : null,
          expiresAt,
          usedAt,
        },
      });
      otps.push(otp);
    }
  }
  console.log(`✅ Created ${otps.length} OTPs`);
  return otps;
}

async function seedNotifications(users: any[]) {
  console.log("📨 Seeding notifications...");

  const notifications = [];
  for (const user of users.slice(0, 8)) {
    const notifCount = faker.number.int({ min: 0, max: 5 });
    for (let n = 0; n < notifCount; n++) {
      const purpose = randomEnum([
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
      ]);
      const channels = faker.helpers.arrayElements(
        ["push", "email", "sms", "whatsapp"] as const,
        { min: 1, max: 2 },
      );
      const priority = randomEnum(["normal", "important"]);
      const status = randomEnum(["pending", "partial", "sent", "failed"]);
      const viewedAt =
        status === "sent" && faker.datatype.boolean(0.5)
          ? randomDate(
              new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
              new Date(),
            )
          : null;

      const notif = await prisma.notification.create({
        data: {
          userId: user.id,
          purpose,
          channels,
          priority,
          subject: faker.lorem.sentence(),
          message: faker.lorem.paragraph(),
          recipient: user.email || user.phone!,
          meta: faker.datatype.boolean()
            ? ({ reason: faker.lorem.word() } as any)
            : null,
          status,
          viewedAt,
        },
      });
      notifications.push(notif);
    }
  }
  console.log(`✅ Created ${notifications.length} notifications`);
  return notifications;
}

async function seedTrafficSources() {
  console.log("📊 Seeding traffic sources...");

  const sources = [];
  for (let i = 0; i < 10; i++) {
    const source = await prisma.trafficSource.create({
      data: {
        utmSource: faker.helpers.arrayElement([
          "google",
          "facebook",
          "twitter",
          "linkedin",
          "direct",
          null,
        ]),
        utmMedium: faker.helpers.arrayElement([
          "cpc",
          "social",
          "email",
          "organic",
          null,
        ]),
        utmCampaign: faker.datatype.boolean(0.5) ? faker.lorem.word() : null,
        utmTerm: faker.datatype.boolean(0.3) ? faker.lorem.word() : null,
        utmContent: faker.datatype.boolean(0.2) ? faker.lorem.words(2) : null,
        referrer: faker.datatype.boolean(0.7) ? faker.internet.url() : null,
        landingPage: faker.internet.url(),
        ip: faker.internet.ip(),
        userAgent: faker.internet.userAgent(),
      },
    });
    sources.push(source);
  }
  console.log(`✅ Created ${sources.length} traffic sources`);
  return sources;
}

async function seedContactMessages(trafficSources: any[]) {
  console.log("📧 Seeding contact messages...");

  const messages = [];
  for (let i = 0; i < 8; i++) {
    const status = randomEnum(["pending", "viewed", "replied"]);
    const viewedAt =
      status !== "pending"
        ? randomDate(
            new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
            new Date(),
          )
        : null;
    const repliedAt =
      status === "replied"
        ? randomDate(
            viewedAt || new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
            new Date(),
          )
        : null;

    const msg = await prisma.contactMessage.create({
      data: {
        trafficSourceId: faker.datatype.boolean(0.3)
          ? trafficSources[Math.floor(Math.random() * trafficSources.length)].id
          : null,
        fullName: faker.person.fullName(),
        practiceName: faker.datatype.boolean(0.5) ? faker.company.name() : null,
        email: faker.internet.email(),
        phone: faker.phone.number(),
        practiceType: faker.datatype.boolean(0.4)
          ? randomEnum([
              "privatePractice",
              "groupPractice",
              "hospital",
              "clinic",
              "urgentCare",
              "specialtyClinic",
              "other",
            ])
          : null,
        bestContactTime: faker.datatype.boolean(0.4)
          ? randomEnum(["morning", "afternoon", "evening", "anytime"])
          : null,
        message: faker.lorem.paragraphs(2),
        status,
        notes: status === "replied" ? faker.lorem.sentence() : null,
        viewedAt,
        repliedAt,
      },
    });
    messages.push(msg);
  }
  console.log(`✅ Created ${messages.length} contact messages`);
  return messages;
}

async function seedConsultationRequests(trafficSources: any[]) {
  console.log("💬 Seeding consultation requests...");

  const requests = [];
  for (let i = 0; i < 6; i++) {
    const status = randomEnum(["new", "contacted", "qualified", "closed"]);
    const req = await prisma.consultationRequest.create({
      data: {
        trafficSourceId: faker.datatype.boolean(0.3)
          ? trafficSources[Math.floor(Math.random() * trafficSources.length)].id
          : null,
        fullName: faker.person.fullName(),
        practiceName: faker.company.name(),
        email: faker.internet.email(),
        phone: faker.phone.number(),
        practiceType: faker.datatype.boolean(0.5)
          ? randomEnum([
              "privatePractice",
              "groupPractice",
              "hospital",
              "clinic",
              "urgentCare",
              "specialtyClinic",
              "other",
            ])
          : null,
        monthlyClaims: faker.datatype.boolean(0.5)
          ? randomEnum([
              "range_0_250",
              "range_251_1000",
              "range_1001_3000",
              "range_3000_plus",
            ])
          : null,
        message: faker.lorem.paragraphs(2),
        status,
        notes: status !== "new" ? faker.lorem.sentence() : null,
      },
    });
    requests.push(req);
  }
  console.log(`✅ Created ${requests.length} consultation requests`);
  return requests;
}

async function seedNewsletterSubscribers(trafficSources: any[]) {
  console.log("📰 Seeding newsletter subscribers...");

  const subscribers = [];
  for (let i = 0; i < 10; i++) {
    const isActive = faker.datatype.boolean(0.8);
    const unsubscribedAt = !isActive
      ? randomDate(new Date(Date.now() - 60 * 24 * 60 * 60 * 1000), new Date())
      : null;

    const sub = await prisma.newsletterSubscriber.create({
      data: {
        trafficSourceId: faker.datatype.boolean(0.3)
          ? trafficSources[Math.floor(Math.random() * trafficSources.length)].id
          : null,
        name: faker.person.fullName(),
        email: faker.internet.email().toLowerCase(),
        isActive,
        unsubscribedAt,
      },
    });
    subscribers.push(sub);
  }
  console.log(`✅ Created ${subscribers.length} newsletter subscribers`);
  return subscribers;
}

async function seedAuditLogs(users: any[]) {
  console.log("📋 Seeding audit logs...");

  const logs = [];
  for (let i = 0; i < 20; i++) {
    const user = faker.datatype.boolean(0.7)
      ? users[Math.floor(Math.random() * users.length)]
      : null;
    const action = randomEnum([
      "create",
      "update",
      "delete",
      "login",
      "logout",
      "statusChange",
    ]);
    const log = await prisma.auditLog.create({
      data: {
        userId: user?.id || null,
        action,
        entityType: faker.helpers.arrayElement([
          "User",
          "Post",
          "Category",
          "Media",
          "ContactMessage",
        ]),
        entityId: faker.string.uuid(),
        meta: faker.datatype.boolean()
          ? ({ reason: faker.lorem.word() } as any)
          : null,
        ip: faker.internet.ip(),
        userAgent: faker.internet.userAgent(),
        createdAt: randomDate(new Date(2024, 0, 1), new Date()),
      },
    });
    logs.push(log);
  }
  console.log(`✅ Created ${logs.length} audit logs`);
  return logs;
}

async function seedBusinessProfile(users: any[], media: any[]) {
  console.log("🏢 Seeding business profile...");

  // Use the first admin as uploader, or any user
  const admin = users.find((u) => u.role === "admin") || users[0];
  // Find a logo media or create one
  let logoMedia = media.find((m) => m.type === "logo");
  if (!logoMedia) {
    logoMedia = await prisma.media.create({
      data: {
        uploadedById: admin.id,
        url: "https://via.placeholder.com/150",
        filename: "default-logo.png",
        mimeType: "image/png",
        size: 1024,
        hash: faker.string.alphanumeric(64),
        title: "Default Logo",
        type: "logo",
        visibility: "public",
      },
    });
  }
  // Similarly for favicon and cover
  let faviconMedia = media.find((m) => m.type === "logo") || logoMedia;
  let coverMedia = media.find((m) => m.type === "photo");

  const profile = await prisma.businessProfile.create({
    data: {
      name: "Awesome Business",
      legalName: "Awesome Business LLC",
      description: faker.company.catchPhrase(),
      faviconId: faviconMedia.id,
      logoId: logoMedia.id,
      coverId: coverMedia?.id || null,
      email: faker.internet.email({ provider: "business.com" }),
      phone: faker.phone.number(),
      website: faker.internet.url(),
      tiktok: faker.datatype.boolean(0.3)
        ? `@${faker.internet.domainName()}`
        : null,
      facebook: faker.datatype.boolean(0.3)
        ? `https://facebook.com/${faker.internet.domainName()}`
        : null,
      instagram: faker.datatype.boolean(0.3)
        ? `https://instagram.com/${faker.internet.domainName()}`
        : null,
      twitter: faker.datatype.boolean(0.3)
        ? `https://twitter.com/${faker.internet.domainName()}`
        : null,
      linkedin: faker.datatype.boolean(0.3)
        ? `https://linkedin.com/in/${faker.internet.domainName()}`
        : null,
      youtube: faker.datatype.boolean(0.3)
        ? `https://youtube.com/@${faker.internet.domainName()}`
        : null,
      address: faker.location.streetAddress(),
      city: faker.location.city(),
      state: faker.location.state(),
      country: faker.location.country(),
      postalCode: faker.location.zipCode(),
      metaTitle: faker.lorem.words(5),
      metaDescription: faker.lorem.sentence(),
    },
  });
  console.log(`✅ Created business profile`);
  return profile;
}

// ----------------------------------------------------------------------
// MAIN
async function main() {
  console.log("🌱 Starting seeding...");

  try {
    const { allUsers } = await seedUsers();
    const media = await seedMedia(allUsers);
    const categories = await seedCategories();
    const tags = await seedTags();
    await seedPosts(allUsers, categories, tags, media);
    await seedSessions(allUsers);
    await seedOtps(allUsers);
    await seedNotifications(allUsers);
    const trafficSources = await seedTrafficSources();
    await seedContactMessages(trafficSources);
    await seedConsultationRequests(trafficSources);
    await seedNewsletterSubscribers(trafficSources);
    await seedAuditLogs(allUsers);
    await seedBusinessProfile(allUsers, media);

    console.log("✅ All seeding completed successfully!");
  } catch (error) {
    console.error("❌ Seeding failed:", error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

main();
