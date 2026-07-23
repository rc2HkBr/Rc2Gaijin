import { PrismaClient } from '@prisma/client';
import { PrismaLibSql } from '@prisma/adapter-libsql';
import { createClient } from '@libsql/client';

const globalForPrisma = global as unknown as { prisma: PrismaClient };

const createPrisma = () => {
  const adapter = new PrismaLibSql({
    url: 'file:dev.db',
  });
  return new PrismaClient({ adapter, log: ['query'] });
};

export const prisma = globalForPrisma.prisma || createPrisma();

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;
