import {
  User,
  IUserRepository,
  UserFilter,
  CreateUserDTO,
} from "@/domains/user";
import { prismaConnector } from "@/main/infra/prisma/prisma-connector";
import { DbException } from "@/shared/domain/exceptions";

import { PrismaClient } from "@prisma/client";

export class PrismaUserRepository implements IUserRepository {
  private prismaConnection: PrismaClient;

  constructor() {
    this.prismaConnection = prismaConnector.connect();
  }

  async getAll() {
    try {
      const users = await this.prismaConnection.user.findMany({
        orderBy: [{ createdAt: "desc" }],
      });
      return users;
    } catch (err) {
      throw new DbException((err as Error).message);
    }
  }

  async find(query: UserFilter): Promise<User[] | []> {
    try {
      const { name, email, order = "createdAt", orderBy = "desc" } = query;

      const prismaFilterObject = {
        ...(name ? { name: { contains: name } } : {}),
        ...(email ? { email: { contains: email } } : {}),
      };

      const users = await this.prismaConnection.user.findMany({
        orderBy: [{ [order]: orderBy }],
        where: {
          OR: Object.entries(prismaFilterObject).map(([key, value]) => {
            return { [key]: value };
          }),
        },
      });
      return users;
    } catch (err) {
      throw new DbException((err as Error).message);
    }
  }

  async findById(id: string): Promise<User | null> {
    try {
      const user = await this.prismaConnection.user.findUnique({
        where: { id },
      });
      return user;
    } catch (err) {
      throw new DbException((err as Error).message);
    }
  }

  async delete(id: string): Promise<void> {
    try {
      await this.prismaConnection.user.delete({
        where: { id },
      });
    } catch (err) {
      throw new DbException((err as Error).message);
    }
  }

  async update(id: string, data: Partial<User>): Promise<User | null> {
    const { profilePhoto, chats, messages, ...restUser } = data;
    try {
      const updatedUser = this.prismaConnection.user.update({
        where: { id },
        data: {
          ...restUser,
          profilePhoto: profilePhoto ?? "",
          ...(messages?.length
            ? {
                messages: {
                  connect: messages.map((message) => ({ id: message.id })),
                },
              }
            : {}),
          ...(chats?.length
            ? {
                chats: {
                  connect: chats?.map((chat) => ({ id: chat.id })),
                },
              }
            : {}),
        },
      });
      return updatedUser;
    } catch (err) {
      throw new DbException((err as Error).message);
    }
  }

  async create(data: CreateUserDTO): Promise<(User & { id: string }) | null> {
    try {
      const { profilePhoto, chats, messages, ...restUser } = data;

      const user = await this.prismaConnection.user.create({
        data: {
          ...restUser,
          profilePhoto: profilePhoto ?? "",
          ...(messages?.length
            ? {
                messages: {
                  connect: messages.map((message) => ({ id: message.id })),
                },
              }
            : {}),
          ...(chats?.length
            ? {
                chats: {
                  connect: chats?.map((chat) => ({ id: chat.id })),
                },
              }
            : {}),
        },
      });
      return user;
    } catch (err) {
      throw new DbException((err as Error).message);
    }
  }

  async checkUserByEmail(email: string) {
    try {
      const userExists = await this.prismaConnection.user.findUnique({
        where: { email },
      });

      return !!userExists;
    } catch (err) {
      throw new DbException((err as Error).message);
    }
  }
}
