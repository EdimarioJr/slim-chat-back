import { PrismaClient } from "@prisma/client";

class PrismaConnector {
  client: null | PrismaClient = null;

  connect(databaseUrl?: string): PrismaClient {
    if (this.client !== null) {
      return this.client;
    }

    this.client = new PrismaClient({
      datasources: {
        db: {
          url: databaseUrl || process.env.DATABASE_URL,
        },
      },
    });

    return this.client;
  }

  async disconnect(): Promise<void> {
    if (this.client !== null) {
      await this.client.$disconnect();
    }
  }
}

const prismaConnector = new PrismaConnector();

export { prismaConnector };
