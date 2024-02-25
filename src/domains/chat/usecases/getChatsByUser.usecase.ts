import { Chat } from "../entities";

export type GetChatsByUserDTO = { userId: Chat["createdBy"]["id"] };

export interface IGetChatsByUserUseCase {
  execute: (
    params: IGetChatsByUserUseCase.Params
  ) => Promise<IGetChatsByUserUseCase.Result>;
}

export namespace IGetChatsByUserUseCase {
  export type Params = GetChatsByUserDTO;

  export type Result = Omit<Chat, "messages" | "members" | "createdBy">[];
}
