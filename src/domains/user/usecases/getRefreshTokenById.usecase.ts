import { RefreshToken } from "..";

export interface IGetRefreshTokenById {
  execute: (
    params: IGetRefreshTokenById.Params
  ) => Promise<IGetRefreshTokenById.Result>;
}

export namespace IGetRefreshTokenById {
  export type Params = {
    id: string;
  };

  export type Result = {
    token: RefreshToken;
  };
}
