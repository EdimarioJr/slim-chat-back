import { IChatRepository, ICreateChatUseCase } from "@/domains/chat";
import { MissingParamsException } from "@/shared/domain";

export class CreateChatUseCase implements ICreateChatUseCase {
  constructor(private readonly chatRepository: IChatRepository) {}

  async execute(
    params: ICreateChatUseCase.Params
  ): Promise<ICreateChatUseCase.Result> {
    const { chat } = params;

    try {
      if (!chat.name || !chat.createdById || !chat.membersIds)
        throw new MissingParamsException(
          "Missing name or createdById params or membersIds params!"
        );

      const { chat: newChat } = await this.chatRepository.create({
        ...chat,
      });

      return { chat: newChat };
    } catch (err) {
      throw err;
    }
  }
}
