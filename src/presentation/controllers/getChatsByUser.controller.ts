import { IGetChatsByUserUseCase } from "@/domains/chat";
import { IController, IHttpResponse } from "../protocols";
import { MissingParamsException, UserPayload } from "@/shared/domain";

export class GetChatsByUserController implements IController {
  constructor(private getChatsByUserUseCase: IGetChatsByUserUseCase) {}

  async handle(params: {
    user: UserPayload;
  }): Promise<IHttpResponse<IGetChatsByUserUseCase.Result>> {
    try {
      const { user } = params;
      const response = await this.getChatsByUserUseCase.execute({
        userId: user.userId,
      });
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
