import { IUpdateChatUseCase } from "@/domains/chat";
import { IController, IHttpResponse } from "../protocols";
import { MissingParamsException } from "@/shared/domain";

export class UpdateChatController implements IController {
  constructor(private updateChatUseCase: IUpdateChatUseCase) {}

  async handle(
    params: IUpdateChatUseCase.Params
  ): Promise<IHttpResponse<IUpdateChatUseCase.Result>> {
    try {
      const response = await this.updateChatUseCase.execute(params);
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
