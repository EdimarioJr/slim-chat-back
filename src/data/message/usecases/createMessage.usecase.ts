import { ICreateMessageUseCase, IMessageRepository } from "@/domains/message";
import { MissingParamsException } from "@/shared/domain";

export class CreateMessageUseCase implements ICreateMessageUseCase {
  constructor(private readonly messageRepository: IMessageRepository) {}

  async execute(
    params: ICreateMessageUseCase.Params
  ): Promise<ICreateMessageUseCase.Result> {
    const { message, chatId, user } = params;

    try {
      if (!chatId) throw new MissingParamsException("Missing chatId");

      const { message: newMessage } = await this.messageRepository.create({
        message,
        chatId,
        createdById: user.userId,
      });

      return { message: newMessage };
    } catch (err) {
      throw err;
    }
  }
}
