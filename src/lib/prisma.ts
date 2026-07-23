import { PrismaClient } from '@prisma/client';
import { PrismaLibSql } from '@prisma/adapter-libsql';

const globalForPrisma = global as unknown as { prisma: PrismaClient };

const createPrisma = () => {
  const url = process.env.DATABASE_URL || 'file:dev.db';
  const adapter = new PrismaLibSql({ url });
  return new PrismaClient({ adapter, log: ['query'] });
};

export const prisma = globalForPrisma.prisma || createPrisma();

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;
