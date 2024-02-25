import { GetChatsByUserController } from "@/presentation/controllers";
import { getChatsByUserUseCaseFactory } from "../usecases";

export const getChatsByUserControllerFactory = () => {
  const getChatsByUserUseCase = getChatsByUserUseCaseFactory();
  return new GetChatsByUserController(getChatsByUserUseCase);
};
