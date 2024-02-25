import { UserPayload } from "@/shared/domain";
import { Message } from "../entities";

export interface ICreateMessageUseCase {
  execute: (
    params: ICreateMessageUseCase.Params
  ) => Promise<ICreateMessageUseCase.Result>;
}

export namespace ICreateMessageUseCase {
  export type Params = {
    message: string;
    chatId: string;
    user: UserPayload;
  };

  export type Result = {
    message: Omit<Message, "createdBy">;
  };
}
