import { CreateMessageUseCase } from "@/data/message/usecases";
import { ICreateMessageUseCase } from "@/domains/message";
import { PrismaMessageRepository } from "@/infra/prisma/repositories";

export const createMessageUseCaseFactory = (): ICreateMessageUseCase => {
  const messageRepository = new PrismaMessageRepository();
  const messageUseCase = new CreateMessageUseCase(messageRepository);
  return messageUseCase;
};
