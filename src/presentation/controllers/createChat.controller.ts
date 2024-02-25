import { Chat, ICreateChatUseCase } from "@/domains/chat";
import { IController, IHttpResponse } from "../protocols";
import { MissingParamsException, UserPayload } from "@/shared/domain";

export type CreateChatControllerParams = Omit<
  Chat,
  "createdBy" | "messages" | "members" | "id"
> & {
  membersIds: string[];
};

export class CreateChatController implements IController {
  constructor(private createChatUseCase: ICreateChatUseCase) {}

  async handle(
    params: CreateChatControllerParams & { user: UserPayload }
  ): Promise<IHttpResponse<ICreateChatUseCase.Result>> {
    try {
      const { user, ...rest } = params;
      const response = await this.createChatUseCase.execute({
        chat: {
          ...rest,
          createdById: user.userId,
        },
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
