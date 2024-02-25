import { replaceRefreshTokenUseCaseFactory } from "../usecases";
import { ReplaceRefreshTokenController } from "@/presentation/controllers/replaceRefreshTokenController";

export const replaceRefreshTokenControllerFactory = () => {
  const replaceRefreshTokenUseCase = replaceRefreshTokenUseCaseFactory();
  return new ReplaceRefreshTokenController(replaceRefreshTokenUseCase);
};
