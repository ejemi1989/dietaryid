// Prisma client singleton — ready for when DATABASE_URL is configured.
// Steps to activate:
//   1. Install: npm install @prisma/client prisma
//   2. Set DATABASE_URL in .env.local
//   3. Run: npx prisma generate
//   4. Uncomment below

/*
import { PrismaClient } from "@prisma/client";
const globalForPrisma = globalThis as unknown as { prisma: PrismaClient | undefined };
export const prisma = globalForPrisma.prisma ?? new PrismaClient({ log: process.env.NODE_ENV === "development" ? ["warn", "error"] : ["error"] });
if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
if (typeof process !== "undefined") process.on("beforeExit", async () => { await prisma.$disconnect(); });
*/

export const prisma = null as unknown as Record<string, any>;

export function getPrisma() {
  if (!prisma) throw new Error("Prisma client not connected. Set DATABASE_URL and run npx prisma generate.");
  return prisma;
}
