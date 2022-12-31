import {
  CreatingUserException,
  UserAlreadyExistsException,
} from "@/data/user/exceptions";
import { IRegisterUseCase } from "@/domains/user/usecases";
import { MissingParamsException } from "@/shared/domain/exceptions";
import { IController, IHttpResponse } from "../protocols";

export class RegisterController implements IController {
  constructor(private readonly registerUseCase: IRegisterUseCase) {}

  async handle({
    name,
    email,
    password,
  }: IRegisterUseCase.Params): Promise<IHttpResponse> {
    try {
      if (!name || !email || !password)
        return {
          statusCode: 400,
          error: new MissingParamsException("Missing params"),
          body: null,
        };

      const { accessToken } = await this.registerUseCase.execute({
        name,
        email,
        password,
      });

      return { body: { accessToken }, statusCode: 200, error: null };
    } catch (err) {
      if (err instanceof UserAlreadyExistsException) {
        return { error: err, statusCode: 400, body: null };
      }

      if (err instanceof CreatingUserException) {
        return { error: err, statusCode: 500, body: null };
      }

      return { error: err as Error, statusCode: 500, body: null };
    }
  }
}
