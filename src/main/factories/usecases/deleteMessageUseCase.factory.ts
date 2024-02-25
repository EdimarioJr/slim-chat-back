import { DeleteMessageUseCase } from "@/data/message/usecases";
import { IDeleteMessageUseCase } from "@/domains/message";
import { PrismaMessageRepository } from "@/infra/prisma/repositories";

export const deleteMessageUseCaseFactory = (): IDeleteMessageUseCase => {
  const messageRepository = new PrismaMessageRepository();
  const messageUseCase = new DeleteMessageUseCase(messageRepository);
  return messageUseCase;
};
