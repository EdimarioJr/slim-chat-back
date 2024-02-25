import {
  GenerateTokensUseCase,
  ReplaceRefreshTokenUseCase,
} from "@/data/user/usecases";
import { BCrypt } from "@/infra/crypt";
import { JsonWebToken } from "@/infra/jwt/jsonwebtoken";
import {
  PrismaRefreshTokenRepository,
  PrismaUserRepository,
} from "@/infra/prisma/repositories";
import { UUIDV4 } from "@/infra/uuid/uuid";
import { JWT_ACCESS_SECRET } from "@/main/config/consts";

export const replaceRefreshTokenUseCaseFactory = () => {
  const refreshTokenRepository = new PrismaRefreshTokenRepository();
  const userRepository = new PrismaUserRepository();

  const encrypter = new BCrypt();
  const jwt = new JsonWebToken(JWT_ACCESS_SECRET as string);
  const uuid = new UUIDV4();

  const generateTokensUseCase = new GenerateTokensUseCase(
    refreshTokenRepository,
    jwt,
    encrypter,
    uuid
  );
  const replaceRefreshTokenUseCase = new ReplaceRefreshTokenUseCase(
    refreshTokenRepository,
    userRepository,
    generateTokensUseCase,
    jwt,
    encrypter
  );
  return replaceRefreshTokenUseCase;
};
