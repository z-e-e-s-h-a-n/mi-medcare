import "dotenv/config";
import { PrismaClient } from "../prisma/generated/client";
import { PrismaPg } from "@prisma/adapter-pg";
import argon2 from "argon2";

const connectionString =
  process.env.NODE_ENV === "production"
    ? process.env.PROD_DB_URI
    : process.env.DB_URI;
const adapter = new PrismaPg({ connectionString });
const prisma = new PrismaClient({ adapter });

async function adminBootstrap() {
  const { ADMIN_EMAIL, ADMIN_PASSWORD, ADMIN_NAME } = process.env;

  if (process.env.NODE_ENV === "production" && !process.env.PROD_DB_URI) {
    throw new Error("PROD_DB_URI must be set in production");
  }

  if (!ADMIN_EMAIL || !ADMIN_PASSWORD || !ADMIN_NAME) {
    throw new Error("Missing ADMIN env variables");
  }

  console.log("🚀 Checking for existing admin...");

  const existingAdmin = await prisma.user.findFirst({
    where: { role: "admin" },
  });

  if (existingAdmin) {
    console.log("existingAdmin", existingAdmin.id);

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
      role: "admin",
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
