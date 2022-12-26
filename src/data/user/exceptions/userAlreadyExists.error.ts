import { BaseException } from "../../../shared/domain/exceptions";

export class UserAlreadyExistsException extends BaseException {
  constructor(message: string) {
    super({
      message,
      name: "UserAlreadyExistsException",
    });
  }
}
