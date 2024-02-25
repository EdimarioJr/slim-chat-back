import { UpdateChatController } from "@/presentation/controllers";
import { updateChatUseCaseFactory } from "../usecases";

export const updateChatControllerFactory = () => {
  const updateChatUseCase = updateChatUseCaseFactory();
  return new UpdateChatController(updateChatUseCase);
};
