import { Chat } from "../entities";

export interface IUpdateChatUseCase {
  execute: (
    params: IUpdateChatUseCase.Params
  ) => Promise<IUpdateChatUseCase.Result>;
}

export namespace IUpdateChatUseCase {
  export type Params = {
    chat: Partial<Chat>;
    id: number;
  };

  export type Result = {
    chat: Chat;
  };
}
