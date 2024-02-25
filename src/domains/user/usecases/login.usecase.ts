import { RefreshToken } from "..";

export interface ILoginUseCase {
  execute: (params: ILoginUseCase.Params) => Promise<ILoginUseCase.Result>;
}

export namespace ILoginUseCase {
  export type Params = {
    email: string;
    password: string;
  };

  export type Result = {
    accessToken: string;
    refreshToken: string;
  };
}
