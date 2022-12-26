import { BaseException } from "./baseException";

export class DbException extends BaseException {
  constructor(message: string) {
    super({ message, name: "DbException" });
  }
}
