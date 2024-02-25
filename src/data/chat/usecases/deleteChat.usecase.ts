import { IChatRepository, IDeleteChatUseCase } from "@/domains/chat";
import { MissingParamsException } from "@/shared/domain";

export class DeleteChatUseCase implements IDeleteChatUseCase {
  constructor(private readonly chatRepository: IChatRepository) {}

  async execute(
    params: IDeleteChatUseCase.Params
  ): Promise<IDeleteChatUseCase.Result> {
    const { id } = params;

    try {
      if (!id) throw new MissingParamsException("Missing id param!");

      await this.chatRepository.delete(id);
    } catch (err) {
      throw err;
    }
  }
}
