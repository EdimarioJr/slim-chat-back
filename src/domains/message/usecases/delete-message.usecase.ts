export interface IDeleteMessageUseCase {
  execute: (params: IDeleteMessageUseCase.Params) => Promise<void>;
}

export namespace IDeleteMessageUseCase {
  export type Params = {
    id: number;
  };
}
