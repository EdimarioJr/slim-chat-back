import { BaseException } from "./baseException";

export class UnauthorizedException extends BaseException {
  constructor(message: string) {
    super({ message, name: "UnauthorizedException" });
  }
}
