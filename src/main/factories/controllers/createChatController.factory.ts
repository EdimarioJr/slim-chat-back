import { CreateChatController } from "@/presentation/controllers";
import { createChatUseCaseFactory } from "../usecases";

export const createChatControllerFactory = () => {
  const createChatUseCase = createChatUseCaseFactory();
  return new CreateChatController(createChatUseCase);
};
