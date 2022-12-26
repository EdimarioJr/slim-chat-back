import { BaseException } from "../../../shared/domain/exceptions";

export class IncorrectPasswordException extends BaseException {
  constructor(message: string) {
    super({
      message,
      name: "IncorrectPasswordException",
    });
  }
}
