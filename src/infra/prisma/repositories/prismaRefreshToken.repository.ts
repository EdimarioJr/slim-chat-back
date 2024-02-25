import { RefreshToken } from "@/domains/user";
import {
  CreateRefreshTokenDTO,
  IRefreshTokenRepository,
} from "@/domains/user/repositories/refreshTokenRepository";
import { prismaConnector } from "@/main/infra/prisma/prisma-connector";
import { DbException } from "@/shared/domain/exceptions";

import { PrismaClient } from "@prisma/client";

export class PrismaRefreshTokenRepository implements IRefreshTokenRepository {
  private prismaConnection: PrismaClient;

  constructor() {
    this.prismaConnection = prismaConnector.connect();
  }

  async findById(id: string): Promise<RefreshToken> {
    try {
      const user = await this.prismaConnection.refreshToken.findUniqueOrThrow({
        where: { id },
        include: {
          user: true,
        },
      });
      return user;
    } catch (err) {
      throw new DbException((err as Error).message);
    }
  }

  async revoke(id: string): Promise<void> {
    try {
      await this.prismaConnection.refreshToken.update({
        where: { id },
        data: {
          revoked: true,
        },
      });
    } catch (err) {
      throw new DbException((err as Error).message);
    }
  }

  async create({
    jti,
    refreshToken,
    userId,
  }: CreateRefreshTokenDTO): Promise<RefreshToken> {
    try {
      const newRefreshToken = await this.prismaConnection.refreshToken.create({
        data: {
          id: jti,
          revoked: false,
          hashedToken: refreshToken,
          user: {
            connect: {
              id: userId,
            },
          },
        },
        include: {
          user: true,
        },
      });
      return newRefreshToken;
    } catch (err) {
      throw new DbException((err as Error).message);
    }
  }
}
