import { BaseException } from "../../../shared/domain/exceptions";

export class ChatDontExistException extends BaseException {
  constructor(message: string) {
    super({
      message,
      name: "ErrorChatDontExistException",
    });
  }
}
