import { RegisterUseCase } from "@/data/user/usecases";
import { BCrypt } from "@/infra/crypt";
import { JsonWebToken } from "@/infra/jwt/jsonwebtoken";
import { PrismaUserRepository } from "@/infra/prisma/repositories";

export const registerUsecaseFactory = () => {
  const encrypter = new BCrypt();
  const jwt = new JsonWebToken(process.env.JWT_ACCESS_SECRET as string);
  const userRepository = new PrismaUserRepository(encrypter);
  const registerUseCase = new RegisterUseCase(userRepository, encrypter, jwt);
  return registerUseCase;
};
