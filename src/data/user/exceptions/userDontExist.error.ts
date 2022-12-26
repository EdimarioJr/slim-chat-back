import { BaseException } from "../../../shared/domain/exceptions";

export class UserDontExistsException extends BaseException {
  constructor(message: string) {
    super({
      message,
      name: "UserDontExistsException",
    });
  }
}
