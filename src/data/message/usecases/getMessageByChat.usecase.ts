import {
  IGetMessageByChatUseCase,
  IMessageRepository,
} from "@/domains/message";
import { MissingParamsException } from "@/shared/domain";

export class GetMessageByChat implements IGetMessageByChatUseCase {
  constructor(private readonly messageRepository: IMessageRepository) {}

  async execute(
    params: IGetMessageByChatUseCase.Params
  ): Promise<IGetMessageByChatUseCase.Result> {
    const { chatId } = params;

    try {
      if (!chatId) throw new MissingParamsException("Missing params: chatId!");

      const messages = await this.messageRepository.findByChat(chatId);

      return { messages };
    } catch (err) {
      throw err;
    }
  }
}
