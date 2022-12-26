import { BaseException } from "./baseException";

export class UserException extends BaseException {
  constructor(message: string) {
    super({ message, name: "UserException" });
  }
}
