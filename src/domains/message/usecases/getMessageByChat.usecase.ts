import { Message } from "../entities";

export interface IGetMessageByChatUseCase {
  execute: (
    params: IGetMessageByChatUseCase.Params
  ) => Promise<IGetMessageByChatUseCase.Result>;
}

export namespace IGetMessageByChatUseCase {
  export type Params = { chatId: string };

  export type Result = {
    messages: Message[];
  };
}
