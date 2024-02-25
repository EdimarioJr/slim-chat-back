import { BaseException } from "./baseException";

export class UnknownException extends BaseException {
  constructor(message: string) {
    super({ message, name: "UnknownException" });
  }
}
