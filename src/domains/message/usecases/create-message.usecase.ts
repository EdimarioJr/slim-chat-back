import { Message } from "../entities";

export interface ICreateMessageUseCase {
  execute: (
    params: ICreateMessageUseCase.Params
  ) => Promise<ICreateMessageUseCase.Result>;
}

export namespace ICreateMessageUseCase {
  export type Params = {
    message: Message;
  };

  export type Result = {
    message: Message;
  };
}
