export interface IRevokeRefreshToken {
  execute: (
    params: IRevokeRefreshToken.Params
  ) => Promise<IRevokeRefreshToken.Result>;
}

export namespace IRevokeRefreshToken {
  export type Params = {
    id: string;
  };

  export type Result = void;
}
