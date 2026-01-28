import { PrismaClient } from "@generated/prisma";
import { PrismaPg } from "@prisma/adapter-pg";
import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });
import {
  seedUsers,
  seedCategories,
  seedTags,
  seedPosts,
  seedMedia,
  createSampleContent,
} from "./seed-functions";

const adapter = new PrismaPg({
  connectionString: process.env.DB_URI,
});

const prisma = new PrismaClient({
  adapter,
});

async function main() {
  console.log("🌱 Starting medical billing website seeding...");
  if (process.env.NODE_ENV !== "development") {
    return;
  }

  try {
    // =========================
    // USERS
    // =========================
    const { editor, author } = await seedUsers(prisma);

    // =========================
    // MEDIA
    // =========================
    const mediaItems = await seedMedia(prisma, editor);

    // =========================
    // CATEGORIES
    // =========================
    const categories = await seedCategories(prisma);

    // =========================
    // TAGS
    // =========================
    const tags = await seedTags(prisma);

    // =========================
    // POSTS
    // =========================
    await seedPosts(prisma, {
      editor,
      author,
      mediaItems,
      categories,
      tags,
    });

    // =========================
    // CREATE SAMPLE CONTENT FOR EACH USER
    // =========================
    await createSampleContent(
      prisma,
      { editor, author },
      categories,
      tags,
      mediaItems,
    );

    console.log("✅ Medical billing website seeding completed");
  } catch (error) {
    console.error("❌ Seeding failed:", error);
    throw error;
  }
}

main();
