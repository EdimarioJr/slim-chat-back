import { BaseException } from "../../../shared/domain/exceptions";

export class TokenDontExistException extends BaseException {
  constructor(message: string) {
    super({
      message,
      name: "TokenDontExistException",
    });
  }
}
