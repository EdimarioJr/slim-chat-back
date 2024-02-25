import { GetMessageByChat } from "@/data/message/usecases";
import { IGetMessageByChatUseCase } from "@/domains/message";
import { PrismaMessageRepository } from "@/infra/prisma/repositories";

export const getMessageByChatUseCaseFactory = (): IGetMessageByChatUseCase => {
  const messageRepository = new PrismaMessageRepository();
  const messageUseCase = new GetMessageByChat(messageRepository);
  return messageUseCase;
};
