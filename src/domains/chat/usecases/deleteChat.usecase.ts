export interface IDeleteChatUseCase {
  execute: (params: IDeleteChatUseCase.Params) => Promise<void>;
}

export namespace IDeleteChatUseCase {
  export type Params = {
    id: string;
  };

  export type Result = void;
}
