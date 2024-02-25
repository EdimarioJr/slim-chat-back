import { RefreshToken, User } from "..";

export interface IGenerateTokensUseCase {
  execute: (
    params: IGenerateTokensUseCase.Params
  ) => Promise<IGenerateTokensUseCase.Result>;
}

export namespace IGenerateTokensUseCase {
  export type Params = {
    userId: User["id"];
    name: User["name"];
    email: User["email"];
  };

  export type Result = {
    refreshToken: string;
    accessToken: string;
  };
}
