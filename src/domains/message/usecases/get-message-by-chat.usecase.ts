import { Message } from "../entities";

export interface IGetMessageUseCase {
  execute: (
    params: IGetMessageUseCase.Params
  ) => Promise<IGetMessageUseCase.Result>;
}

export namespace IGetMessageUseCase {
  export type Params = {};

  export type Result = {
    messages: Message[];
  };
}
