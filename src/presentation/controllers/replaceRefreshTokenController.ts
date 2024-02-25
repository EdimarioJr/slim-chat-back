import {
  InvalidTokenException,
  TokenDontExistException,
  TokenRevokedException,
} from "@/data/user/exceptions";
import { IReplaceRefreshTokenUseCase } from "@/domains/user/usecases";
import { MissingParamsException } from "@/shared/domain/exceptions";
import { IController, IHttpResponse } from "../protocols";
import { ReplaceRefreshTokenUseCase } from "@/data/user/usecases";

export class ReplaceRefreshTokenController implements IController {
  constructor(
    private readonly replaceRefreshTokenUseCase: ReplaceRefreshTokenUseCase
  ) {}

  async handle({
    refreshToken,
  }: IReplaceRefreshTokenUseCase.Params): Promise<IHttpResponse> {
    try {
      if (!refreshToken)
        return {
          statusCode: 400,
          error: new MissingParamsException("Missing params: refreshToken"),
          body: null,
        };

      const { refreshToken: newRefreshToken, accessToken } =
        await this.replaceRefreshTokenUseCase.execute({
          refreshToken,
        });

      return {
        body: { refreshToken: newRefreshToken, accessToken },
        statusCode: 200,
        error: null,
      };
    } catch (err) {
      if (
        err instanceof InvalidTokenException ||
        err instanceof TokenRevokedException ||
        err instanceof TokenDontExistException
      ) {
        return { error: err, statusCode: 400, body: null };
      }

      return { error: err as Error, statusCode: 500, body: null };
    }
  }
}
