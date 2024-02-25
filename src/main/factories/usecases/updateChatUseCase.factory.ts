import { UpdateChatUseCase } from "@/data/chat/usecases";

import { IUpdateChatUseCase } from "@/domains/chat";
import { PrismaChatRepository } from "@/infra/prisma/repositories";

export const updateChatUseCaseFactory = (): IUpdateChatUseCase => {
  const chatRepository = new PrismaChatRepository();
  const chatUseCase = new UpdateChatUseCase(chatRepository);
  return chatUseCase;
};
