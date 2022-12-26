import { UserDontExistsException } from "@/data/user/exceptions";
import { IncorrectPasswordException } from "@/data/user/exceptions/incorrectPassword.error";
import { ILoginUseCase } from "@/domains/user/usecases";
import { MissingParamsException } from "@/shared/domain/exceptions";
import { IController, IHttpResponse } from "../protocols";

export class LoginController implements IController {
  constructor(private readonly loginUseCase: ILoginUseCase) {}

  async handle({
    email,
    password,
  }: ILoginUseCase.Params): Promise<IHttpResponse> {
    try {
      console.log(new Error("teste").message);
      if (!email || !password) {
        return {
          statusCode: 400,
          error: new MissingParamsException("Missing e-mail or password"),
          body: null,
        };
      }

      const { accessToken } = await this.loginUseCase.execute({
        email,
        password,
      });
      return { body: { accessToken }, statusCode: 200, error: null };
    } catch (err) {
      if (err instanceof UserDontExistsException)
        return { error: err, statusCode: 400, body: null };
      if (err instanceof IncorrectPasswordException)
        return { body: null, statusCode: 400, error: err };

      return {
        body: null,
        statusCode: 500,
        error: { ...(err as Error), message: "System error" },
      };
    }
  }
}
