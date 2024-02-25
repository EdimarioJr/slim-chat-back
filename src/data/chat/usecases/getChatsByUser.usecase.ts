import { IChatRepository, IGetChatsByUserUseCase } from "@/domains/chat";
import { MissingParamsException } from "@/shared/domain";

export class GetChatsByUserUseCase implements IGetChatsByUserUseCase {
  constructor(private readonly chatRepository: IChatRepository) {}

  async execute(
    params: IGetChatsByUserUseCase.Params
  ): Promise<IGetChatsByUserUseCase.Result> {
    const { userId } = params;

    try {
      if (!userId) throw new MissingParamsException("Missing user id param!");

      const chats = await this.chatRepository.findByUser(userId);
      return chats;
    } catch (err) {
      throw err;
    }
  }
}
