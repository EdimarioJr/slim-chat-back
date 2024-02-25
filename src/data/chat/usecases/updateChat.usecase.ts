import { IChatRepository, IUpdateChatUseCase } from "@/domains/chat";
import { MissingParamsException } from "@/shared/domain";

export class UpdateChatUseCase implements IUpdateChatUseCase {
  constructor(private readonly chatRepository: IChatRepository) {}

  async execute(
    params: IUpdateChatUseCase.Params
  ): Promise<IUpdateChatUseCase.Result> {
    const { chat, id } = params;

    try {
      if (!id) throw new MissingParamsException("Missing id param!");

      const newChat = await this.chatRepository.update(id, chat);

      return { chat: newChat };
    } catch (err) {
      throw err;
    }
  }
}
