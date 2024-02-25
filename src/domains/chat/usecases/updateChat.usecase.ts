import { GetChatDTO } from "../dtos";
import { Chat } from "../entities";

export type UpdateChatDTO = Omit<
  Partial<Chat>,
  "createdBy" | "id" | "messages"
> & {
  membersIds: string[];
};

export interface IUpdateChatUseCase {
  execute: (
    params: IUpdateChatUseCase.Params
  ) => Promise<IUpdateChatUseCase.Result>;
}

export namespace IUpdateChatUseCase {
  export type Params = {
    chat: UpdateChatDTO;
    id: string;
  };

  export type Result = {
    chat: GetChatDTO;
  };
}
