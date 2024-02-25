import { DeleteChatController } from "@/presentation/controllers";
import { deleteChatUseCaseFactory } from "../usecases";

export const deleteChatControllerFactory = () => {
  const deleteChatUseCase = deleteChatUseCaseFactory();
  return new DeleteChatController(deleteChatUseCase);
};
