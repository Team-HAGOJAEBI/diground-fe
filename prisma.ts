import { PrismaClient } from "@prisma/client";

import { createPrismaClient } from "@/mocks/sample/Prisma-mock";

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient };

export const prisma = globalForPrisma.prisma || createPrismaClient();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
