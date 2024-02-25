import { BaseException } from "../../../shared/domain/exceptions";

export class TokenRevokedException extends BaseException {
  constructor(message: string) {
    super({
      message,
      name: "TokenRevokedException",
    });
  }
}
