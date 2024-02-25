import { IController, IHttpResponse } from "../protocols";

import { IDeleteMessageUseCase } from "@/domains/message";
import { MissingParamsException } from "@/shared/domain";

export class DeleteMessageController implements IController {
  constructor(private deleteMessageUseCase: IDeleteMessageUseCase) {}

  async handle(
    params: IDeleteMessageUseCase.Params
  ): Promise<IHttpResponse<IDeleteMessageUseCase.Result>> {
    try {
      const response = await this.deleteMessageUseCase.execute(params);
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
