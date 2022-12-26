export interface ILogoutUseCase {
  execute: () => Promise<ILogoutUseCase.Result>;
}

export namespace ILogoutUseCase {
  export type Result = { accessToken: null };
}
