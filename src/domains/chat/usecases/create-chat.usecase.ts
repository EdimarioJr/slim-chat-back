import { Chat } from "../entities";

export interface ICreateChatUseCase {
  execute: (
    params: ICreateChatUseCase.Params
  ) => Promise<ICreateChatUseCase.Result>;
}

export namespace ICreateChatUseCase {
  export type Params = {
    chat: Chat;
  };

  export type Result = {
    chat: Chat;
  };
}
