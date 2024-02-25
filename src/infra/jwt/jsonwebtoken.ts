import { JwtException } from "@/shared/domain/exceptions";
import {
  IJwt,
  JwtDecodeOptions,
  JwtGenerateOptions,
  JwtVerifyOptions,
} from "@/shared/domain/protocols/jwt";
import jwt from "jsonwebtoken";

export class JsonWebToken implements IJwt {
  constructor(readonly secret: string) {}

  generate(payload: Record<string, unknown>, options?: JwtGenerateOptions) {
    try {
      return jwt.sign(payload, this.secret, options);
    } catch (err) {
      throw new JwtException("Error generating jwt");
    }
  }

  verify(token: string, options?: JwtVerifyOptions) {
    try {
      return Boolean(jwt.verify(token, this.secret, options));
    } catch (err) {
      throw new JwtException("Jwt not valid");
    }
  }

  decode(token: string, options?: JwtDecodeOptions) {
    try {
      return jwt.decode(token, options) as Record<string, unknown>;
    } catch (err) {
      throw new JwtException("Error decoding jwt");
    }
  }
}
