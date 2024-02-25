import { RefreshToken, User } from "../entities";

export interface IRegisterUseCase {
  execute: (
    params: IRegisterUseCase.Params
  ) => Promise<IRegisterUseCase.Result>;
}

export namespace IRegisterUseCase {
  export type Params = Pick<
    User,
    "name" | "email" | "password" | "profilePhoto"
  >;

  export type Result = {
    accessToken: string;
    refreshToken: string;
  };
}
