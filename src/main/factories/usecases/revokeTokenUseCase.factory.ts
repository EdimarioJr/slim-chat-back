import { RevokeRefreshTokenUseCase } from "@/data/user/usecases";
import { PrismaRefreshTokenRepository } from "@/infra/prisma/repositories";

export const revokeRefreshTokenUseCaseFactory = () => {
  const refreshTokenRepository = new PrismaRefreshTokenRepository();
  const revokeRefreshTokenUseCase = new RevokeRefreshTokenUseCase(
    refreshTokenRepository
  );
  return revokeRefreshTokenUseCase;
};
