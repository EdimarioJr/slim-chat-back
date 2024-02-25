import { GenerateTokensUseCase, LoginUseCase } from "@/data/user/usecases";
import { BCrypt } from "@/infra/crypt";
import { JsonWebToken } from "@/infra/jwt/jsonwebtoken";
import {
  PrismaRefreshTokenRepository,
  PrismaUserRepository,
} from "@/infra/prisma/repositories";
import { UUIDV4 } from "@/infra/uuid/uuid";
import { JWT_ACCESS_SECRET } from "@/main/config/consts";

export const loginUseCaseFactory = () => {
  const encrypter = new BCrypt();
  const jwt = new JsonWebToken(JWT_ACCESS_SECRET as string);
  const uuid = new UUIDV4();
  const refreshTokenRepository = new PrismaRefreshTokenRepository();
  const generateTokens = new GenerateTokensUseCase(
    refreshTokenRepository,
    jwt,
    encrypter,
    uuid
  );
  const userRepository = new PrismaUserRepository();
  return new LoginUseCase(userRepository, encrypter, generateTokens);
};
