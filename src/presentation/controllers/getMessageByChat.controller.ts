import { IController, IHttpResponse } from "../protocols";
import { IGetMessageByChatUseCase } from "@/domains/message";
import { MissingParamsException } from "@/shared/domain";

export class GetMessageByChatController
  implements IController<IGetMessageByChatUseCase.Params>
{
  constructor(private getMessageByChatUseCase: IGetMessageByChatUseCase) {}

  async handle(
    params: IGetMessageByChatUseCase.Params
  ): Promise<IHttpResponse<IGetMessageByChatUseCase.Result>> {
    try {
      const response = await this.getMessageByChatUseCase.execute(params);
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
