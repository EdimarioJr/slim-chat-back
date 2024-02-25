import { BaseException } from "../../../shared/domain/exceptions";

export class InvalidTokenException extends BaseException {
  constructor(message: string) {
    super({
      message,
      name: "InvalidTokenException",
    });
  }
}
