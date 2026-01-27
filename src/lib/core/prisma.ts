import { PrismaClient } from "@generated/prisma";
import { PrismaPg } from "@prisma/adapter-pg";
import { serverEnv } from "./server-env";
import { softDeleteExtension } from "prisma/prisma.extension";

const globalForPrisma = global as unknown as {
  prisma: PrismaClient;
};

const adapter = new PrismaPg({
  connectionString: serverEnv.DB_URI,
});

const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    adapter,
  }).$extends(softDeleteExtension);

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

export default prisma;
