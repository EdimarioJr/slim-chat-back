import { Chat } from "../entities";

export type CreateChatDTO = Omit<
  Chat,
  "createdBy" | "messages" | "members" | "id"
> & {
  membersIds: string[];
  createdById: string;
};

export interface ICreateChatUseCase {
  execute: (
    params: ICreateChatUseCase.Params
  ) => Promise<ICreateChatUseCase.Result>;
}

export namespace ICreateChatUseCase {
  export type Params = {
    chat: CreateChatDTO;
  };

  export type Result = {
    chat: Omit<Chat, "messages" | "members" | "createdBy">;
  };
}
