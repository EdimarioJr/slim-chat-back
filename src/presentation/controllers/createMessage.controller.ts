import { IController, IHttpResponse } from "../protocols";
import { ICreateMessageUseCase } from "@/domains/message";
import { MissingParamsException } from "@/shared/domain";

export class CreateMessageController implements IController {
  constructor(private createMessageUseCase: ICreateMessageUseCase) {}

  async handle(
    params: ICreateMessageUseCase.Params
  ): Promise<IHttpResponse<ICreateMessageUseCase.Result>> {
    try {
      if (!params.message || !params.chatId)
        throw new MissingParamsException("Missing params error!");

      const response = await this.createMessageUseCase.execute(params);
      return { error: null, body: response, statusCode: 200 };
    } catch (err) {
      if (err instanceof MissingParamsException)
        return {
          error: err,
          body: null,
          statusCode: 400,
        };

      return {
        error: err as Error,
        body: null,
        statusCode: 500,
      };
    }
  }
}
