import { GetMessageByChatController } from "@/presentation/controllers";
import { getMessageByChatUseCaseFactory } from "../usecases";

export const getMessageByChatControllerFactory = () => {
  const getMessageByChatUseCase = getMessageByChatUseCaseFactory();
  return new GetMessageByChatController(getMessageByChatUseCase);
};
