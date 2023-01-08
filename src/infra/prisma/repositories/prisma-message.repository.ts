import { IMessageRepository, Message } from "@/domains/message";
import { prismaConnector } from "@/main/infra/prisma/prisma-connector";
import { DbException } from "@/shared/domain/exceptions";
import { PrismaClient } from "@prisma/client";

export class PrismaMessageRepository implements IMessageRepository {
  private prismaConnection: PrismaClient;
  constructor() {
    this.prismaConnection = prismaConnector.connect();
  }

  async getAll() {
    try {
      const messages = await this.prismaConnection.message.findMany({
        orderBy: [{ createdAt: "desc" }],
      });
      return messages;
    } catch (err) {
      throw new DbException((err as Error).message);
    }
  }

  async findByChat(chatId: number) {
    try {
      const messages = await this.prismaConnection.message.findMany({
        orderBy: [{ createdAt: "desc" }],
        where: {
          chatId,
        },
      });
      return messages;
    } catch (err) {
      throw new DbException((err as Error).message);
    }
  }
}
