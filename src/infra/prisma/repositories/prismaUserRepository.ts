import { User } from "@/domains/user/entities";
import { IUserRepository, UserFilter } from "@/domains/user/repositories";
import { prismaConnector } from "@/main/infra/prisma/prisma-connector";
import { DbException } from "@/shared/domain/exceptions";
import { ICrypt } from "@/shared/domain/protocols/crypt";
import { PrismaClient } from "@prisma/client";

export class PrismaUserRepository implements IUserRepository {
  private prismaConnection: PrismaClient;
  private encrypter: ICrypt;

  constructor(encrypter: ICrypt) {
    this.prismaConnection = prismaConnector.connect();
    this.encrypter = encrypter;
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

  async findById(id: number): Promise<User | null> {
    try {
      const user = await this.prismaConnection.user.findUnique({
        where: { id },
      });
      return user;
    } catch (err) {
      throw new DbException((err as Error).message);
    }
  }

  async delete(id: number): Promise<void> {
    try {
      await this.prismaConnection.user.delete({
        where: { id },
      });
    } catch (err) {
      throw new DbException((err as Error).message);
    }
  }

  async update(id: number, data: Partial<User>): Promise<User | null> {
    try {
      const updatedUser = this.prismaConnection.user.update({
        where: { id },
        data,
      });
      return updatedUser;
    } catch (err) {
      throw new DbException((err as Error).message);
    }
  }

  async create(data: User): Promise<(User & { id: number }) | null> {
    try {
      const { password, profilePhoto, ...restUser } = data;

      const user = await this.prismaConnection.user.create({
        data: {
          password,
          profilePhoto: profilePhoto ?? "",
          ...restUser,
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
