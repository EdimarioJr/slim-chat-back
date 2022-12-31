import { LogoutUseCase } from "@/data/user/usecases";
import { ILogoutUseCase } from "@/domains/user/usecases";
import { UnknownException } from "@/shared/domain/exceptions";
import { IController, IHttpResponse } from "../protocols";

export class LogoutController implements IController {
  constructor(private logoutUseCase: LogoutUseCase) {}

  async handle(): Promise<IHttpResponse<ILogoutUseCase.Result>> {
    try {
      const response = await this.logoutUseCase.execute();
      return { error: null, body: response, statusCode: 200 };
    } catch (err) {
      return {
        error: err as Error,
        body: null,
        statusCode: 500,
      };
    }
  }
}
