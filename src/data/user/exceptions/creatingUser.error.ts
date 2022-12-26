import { BaseException } from "../../../shared/domain/exceptions";

export class CreatingUserException extends BaseException {
  constructor(message: string) {
    super({
      message,
      name: "ErrorCreatingUserException",
    });
  }
}
