import { IMiddleware, IHttpResponse } from "@/presentation/protocols";
import { IJwt, UnauthorizedException, UserPayload } from "@/shared/domain";

export class AuthMiddleware implements IMiddleware {
  constructor(private readonly jwt: IJwt) {}

  async execute(request: {
    accessToken: string;
  }): Promise<IHttpResponse<{ user: UserPayload }>> {
    const { accessToken } = request;

    if (!accessToken) {
      return {
        error: new UnauthorizedException("Access token is missing!"),
        body: null,
        statusCode: 401,
      };
    }

    try {
      const isValid = this.jwt.verify(accessToken);

      if (!isValid)
        return {
          error: new UnauthorizedException("Token is invalid or expired!"),
          body: null,
          statusCode: 401,
        };

      return {
        error: null,
        body: { user: this.jwt.decode(accessToken) as UserPayload },
        statusCode: 200,
      };
    } catch (err) {
      return {
        error: new UnauthorizedException("Token is invalid or expired!"),
        body: null,
        statusCode: 401,
      };
    }
  }
}
