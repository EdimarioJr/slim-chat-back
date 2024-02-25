import { IDeleteMessageUseCase, IMessageRepository } from "@/domains/message";
import { MissingParamsException } from "@/shared/domain";

export class DeleteMessageUseCase implements IDeleteMessageUseCase {
  constructor(private readonly messageRepository: IMessageRepository) {}

  async execute(
    params: IDeleteMessageUseCase.Params
  ): Promise<IDeleteMessageUseCase.Result> {
    const { id } = params;

    try {
      if (!id) throw new MissingParamsException("Missing params: id!");

      await this.messageRepository.delete(id);
    } catch (err) {
      throw err;
    }
  }
}
