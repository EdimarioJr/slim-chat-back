import { GenerateTokensUseCase } from "@/data/user/usecases";
import { BCrypt } from "@/infra/crypt";
import { JsonWebToken } from "@/infra/jwt/jsonwebtoken";
import { PrismaRefreshTokenRepository } from "@/infra/prisma/repositories";
import { UUIDV4 } from "@/infra/uuid/uuid";
import { JWT_ACCESS_SECRET } from "@/main/config/consts";

export const generateTokensUseCaseFactory = () => {
  const refreshTokenRepository = new PrismaRefreshTokenRepository();
  const encrypter = new BCrypt();
  const jwt = new JsonWebToken(JWT_ACCESS_SECRET as string);
  const uuid = new UUIDV4();
  const generateRefreshTokenUseCase = new GenerateTokensUseCase(
    refreshTokenRepository,
    jwt,
    encrypter,
    uuid
  );
  return generateRefreshTokenUseCase;
};
