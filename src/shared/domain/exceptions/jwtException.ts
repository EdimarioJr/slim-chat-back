import { BaseException } from "./baseException";

export class JwtException extends BaseException {
  constructor(message: string) {
    super({ message, name: "JwtException" });
  }
}
