import { GetChatsByUserUseCase } from "@/data/chat/usecases";
import { IGetChatsByUserUseCase } from "@/domains/chat";
import { PrismaChatRepository } from "@/infra/prisma/repositories";

export const getChatsByUserUseCaseFactory = (): IGetChatsByUserUseCase => {
  const chatRepository = new PrismaChatRepository();
  const chatUseCase = new GetChatsByUserUseCase(chatRepository);
  return chatUseCase;
};
