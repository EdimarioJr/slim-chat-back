import { RefreshToken } from "..";

export interface IReplaceRefreshTokenUseCase {
  execute: (
    params: IReplaceRefreshTokenUseCase.Params
  ) => Promise<IReplaceRefreshTokenUseCase.Result>;
}

export namespace IReplaceRefreshTokenUseCase {
  export type Params = {
    refreshToken: string;
  };

  export type Result = {
    refreshToken: string;
    accessToken: string;
  };
}
