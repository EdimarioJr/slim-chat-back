import {
  CreateMessageDTO,
  ICreateMessageUseCase,
  IMessageRepository,
  Message,
  UpdateMessageDTO,
} from "@/domains/message";
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
        include: {
          createdBy: true,
        },
      });
      return messages;
    } catch (err) {
      throw new DbException((err as Error).message);
    }
  }

  async findByChat(chatId: string) {
    try {
      const messages = await this.prismaConnection.message.findMany({
        orderBy: [{ createdAt: "desc" }],
        where: {
          chatId,
        },
        include: {
          createdBy: true,
        },
      });
      return messages;
    } catch (err) {
      throw new DbException((err as Error).message);
    }
  }

  async findByUser(userId: string) {
    try {
      const messages = await this.prismaConnection.message.findMany({
        orderBy: [{ createdAt: "desc" }],
        where: {
          createdBy: {
            id: {
              equals: userId,
            },
          },
        },
        include: {
          createdBy: true,
        },
      });
      return messages;
    } catch (err) {
      throw new DbException((err as Error).message);
    }
  }

  async delete(id: string) {
    try {
      await this.prismaConnection.message.delete({
        where: {
          id,
        },
      });
    } catch (err) {
      throw new DbException((err as Error).message);
    }
  }

  async create(data: CreateMessageDTO): Promise<ICreateMessageUseCase.Result> {
    try {
      const message = await this.prismaConnection.message.create({
        data,
      });

      return { message };
    } catch (err) {
      throw new DbException((err as Error).message);
    }
  }

  async update(id: string, data: UpdateMessageDTO): Promise<Message> {
    try {
      const message = await this.prismaConnection.message.update({
        where: {
          id,
        },
        data,
        include: {
          createdBy: true,
        },
      });

      return message;
    } catch (err) {
      throw new DbException((err as Error).message);
    }
  }
}
