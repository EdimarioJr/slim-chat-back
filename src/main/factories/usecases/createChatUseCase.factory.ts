import { CreateChatUseCase } from "@/data/chat/usecases";
import { ICreateChatUseCase } from "@/domains/chat";
import { PrismaChatRepository } from "@/infra/prisma/repositories";

export const createChatUseCaseFactory = (): ICreateChatUseCase => {
  const chatRepository = new PrismaChatRepository();
  const chatUseCase = new CreateChatUseCase(chatRepository);
  return chatUseCase;
};
