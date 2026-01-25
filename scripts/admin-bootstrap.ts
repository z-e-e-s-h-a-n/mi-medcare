import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });
import { PrismaClient } from "../prisma/generated/client";
import { PrismaPg } from "@prisma/adapter-pg";
import argon2 from "argon2";

const connectionString = `${process.env.DB_URI}`;
const adapter = new PrismaPg({ connectionString });
const prisma = new PrismaClient({ adapter });

async function adminBootstrap() {
  const { ADMIN_EMAIL, ADMIN_PASSWORD, ADMIN_NAME, NODE_ENV } = process.env;

  if (NODE_ENV === "production" && !ADMIN_EMAIL) {
    throw new Error("ADMIN env vars must be set explicitly in production");
  }

  if (!ADMIN_EMAIL || !ADMIN_PASSWORD || !ADMIN_NAME) {
    throw new Error("Missing ADMIN env variables");
  }

  console.log("🚀 Checking for existing admin...");

  const existingAdmin = await prisma.user.findFirst({
    where: { role: "admin" },
  });

  if (existingAdmin) {
    throw new Error("❌ Admin already exists. Aborting.");
  }

  const email = ADMIN_EMAIL.toLowerCase();
  const hashedPassword = await argon2.hash(ADMIN_PASSWORD);

  const [firstName, ...rest] = ADMIN_NAME.trim().split(" ");
  const lastName = rest.join(" ") || null;

  const admin = await prisma.user.create({
    data: {
      email,
      password: hashedPassword,
      firstName: firstName!,
      lastName,
      displayName: ADMIN_NAME?.trim(),
      isEmailVerified: true,
      role: "admin"
      ,
    },
  });

  console.log("🎉 First admin created");
  console.log({ id: admin.id, email: admin.email });
}

adminBootstrap()
  .catch((e) => {
    console.error(e.message);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
