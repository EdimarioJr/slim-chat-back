import { BaseException } from "./baseException";

export class CryptException extends BaseException {
  constructor(message: string) {
    super({ message, name: "CryptException" });
  }
}
