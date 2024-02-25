import { IDeleteChatUseCase } from "@/domains/chat";
import { IController, IHttpResponse } from "../protocols";
import { MissingParamsException } from "@/shared/domain";

export class DeleteChatController implements IController {
  constructor(private deleteChatUseCase: IDeleteChatUseCase) {}

  async handle(
    params: IDeleteChatUseCase.Params
  ): Promise<IHttpResponse<IDeleteChatUseCase.Result>> {
    try {
      const response = await this.deleteChatUseCase.execute(params);
      return { error: null, body: response, statusCode: 200 };
    } catch (err) {
      if (err instanceof MissingParamsException)
        return {
          error: err as MissingParamsException,
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
