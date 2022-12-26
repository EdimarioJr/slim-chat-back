import { BaseException } from "./baseException";

export class MissingParamsException extends BaseException {
  constructor(message: string) {
    super({
      message,
      name: "MissingParamsException",
    });
  }
}
