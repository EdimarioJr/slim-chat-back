import {
  ChatFilter,
  CreateChatDTO,
  IChatRepository,
  ICreateChatUseCase,
  UpdateChatDTO,
} from "@/domains/chat";
import { GetChatDTO } from "@/domains/chat/dtos/getChat.dto";
import { prismaConnector } from "@/main/infra/prisma/prisma-connector";
import { DbException } from "@/shared/domain/exceptions";
import { PrismaClient } from "@prisma/client";

export class PrismaChatRepository implements IChatRepository {
  private prismaConnection: PrismaClient;
  constructor() {
    this.prismaConnection = prismaConnector.connect();
  }

  async findById(id: string): Promise<GetChatDTO> {
    try {
      const chat = await this.prismaConnection.chat.findUniqueOrThrow({
        where: {
          id,
        },
        include: {
          members: true,
          messages: {
            include: {
              createdBy: true,
            },
          },
          createdBy: {
            select: {
              id: true,
              name: true,
              email: true,
            },
          },
        },
      });

      return chat;
    } catch (err) {
      throw new DbException((err as Error).message);
    }
  }

  async findByUser(userId: string): Promise<GetChatDTO[]> {
    try {
      const chats = await this.prismaConnection.chat.findMany({
        orderBy: [{ createdAt: "desc" }],
        where: {
          createdById: {
            equals: userId,
          },
        },
        include: {
          createdBy: {
            select: {
              id: true,
              name: true,
              email: true,
            },
          },
        },
      });
      return chats;
    } catch (err) {
      throw new DbException((err as Error).message);
    }
  }

  async delete(id: string) {
    try {
      await this.prismaConnection.chat.delete({
        where: {
          id,
        },
      });
    } catch (err) {
      throw new DbException((err as Error).message);
    }
  }

  async create(data: CreateChatDTO): Promise<ICreateChatUseCase.Result> {
    const { createdById, membersIds, ...rest } = data;
    try {
      const chat = await this.prismaConnection.chat.create({
        data: {
          ...rest,
          members: {
            connect: membersIds.map((member) => ({ id: member })),
          },
          createdBy: {
            connect: {
              id: createdById,
            },
          },
        },
      });

      return { chat };
    } catch (err) {
      throw new DbException((err as Error).message);
    }
  }

  async update(id: string, data: UpdateChatDTO): Promise<GetChatDTO> {
    const { members, ...rest } = data;
    try {
      const chat = await this.prismaConnection.chat.update({
        where: {
          id,
        },
        data: {
          ...rest,
          members: {
            connect: data.membersIds.map((member) => ({ id: member })),
          },
        },
        include: {
          createdBy: {
            select: {
              id: true,
              name: true,
              email: true,
            },
          },
        },
      });

      return chat;
    } catch (err) {
      throw new DbException((err as Error).message);
    }
  }

  async find(query: ChatFilter): Promise<GetChatDTO[] | []> {
    try {
      const { name } = query;

      const prismaFilterObject = {
        ...(name ? { name: { contains: name } } : {}),
      };

      const chats = await this.prismaConnection.chat.findMany({
        orderBy: [{ createdAt: "desc" }],
        where: {
          OR: Object.entries(prismaFilterObject).map(([key, value]) => {
            return { [key]: value };
          }),
        },
        include: {
          createdBy: {
            select: {
              id: true,
              name: true,
              email: true,
            },
          },
        },
      });
      return chats;
    } catch (err) {
      throw new DbException((err as Error).message);
    }
  }
}
