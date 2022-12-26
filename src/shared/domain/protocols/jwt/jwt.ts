export interface IJwtObject {
  headers: Record<string, unknown>;
  payload: Record<string, unknown>;
  signature: string;
}

export type JwtGenerateOptions = {
  algorithm:
    | "HS256"
    | "HS384"
    | "HS512"
    | "RS256"
    | "RS384"
    | "RS512"
    | "ES256"
    | "ES384"
    | "ES512"
    | "PS256"
    | "PS384"
    | "PS512"
    | "none";
  expiresIn?: string | number;
  notBefore?: string | number;
};

export type JwtVerifyOptions = {
  complete?: boolean;
  ignoreExpiration?: boolean;
  maxAge?: string | number;
};

export type JwtDecodeOptions = {
  complete?: boolean;
  json?: boolean;
};

export interface IJwt {
  secret: string;
  generate: (
    payload: IJwtObject["payload"],
    options?: JwtGenerateOptions
  ) => string;
  verify: (token: string, options?: JwtVerifyOptions) => boolean;
  decode: (
    token: string,
    options?: JwtDecodeOptions
  ) => IJwtObject["payload"] | IJwtObject | null | string;
}
