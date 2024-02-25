import { DeleteChatUseCase } from "@/data/chat/usecases";
import { IDeleteChatUseCase } from "@/domains/chat";
import { PrismaChatRepository } from "@/infra/prisma/repositories";

export const deleteChatUseCaseFactory = (): IDeleteChatUseCase => {
  const chatRepository = new PrismaChatRepository();
  const chatUseCase = new DeleteChatUseCase(chatRepository);
  return chatUseCase;
};
