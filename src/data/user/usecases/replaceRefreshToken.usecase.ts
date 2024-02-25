import {
  IGenerateTokensUseCase,
  IReplaceRefreshTokenUseCase,
} from "@/domains/user/usecases";
import { ICrypt } from "@/shared/domain/protocols/crypt";
import { IJwt } from "@/shared/domain/protocols/jwt";
import { IRefreshTokenRepository } from "@/domains/user/repositories/refreshTokenRepository";
import { IUserRepository } from "@/domains/user";
import {
  InvalidTokenException,
  TokenDontExistException,
  TokenRevokedException,
  UserDontExistsException,
} from "../exceptions";

export class ReplaceRefreshTokenUseCase implements IReplaceRefreshTokenUseCase {
  constructor(
    private readonly refreshTokenRepository: IRefreshTokenRepository,
    private readonly userRepository: IUserRepository,
    private readonly generateTokensUseCase: IGenerateTokensUseCase,
    private readonly jwt: IJwt,
    private readonly crypter: ICrypt
  ) {}

  async execute(
    params: IReplaceRefreshTokenUseCase.Params
  ): Promise<IReplaceRefreshTokenUseCase.Result> {
    try {
      const { refreshToken } = params;

      const payload = this.jwt.decode(refreshToken);

      if (!payload) throw new InvalidTokenException("Invalid token!");
      const whitelistedRefreshToken =
        await this.refreshTokenRepository.findById(payload?.jti as string);

      if (!whitelistedRefreshToken)
        throw new TokenDontExistException("Refresh token don't exist!");

      if (whitelistedRefreshToken.revoked === true)
        throw new TokenRevokedException("Refresh token is revoked!");

      const isEqual = this.crypter.compare(
        refreshToken,
        whitelistedRefreshToken.hashedToken
      );

      if (!isEqual) {
        throw new InvalidTokenException("Invalid token");
      }

      const user = await this.userRepository.findById(
        payload?.userId as string
      );
      if (!user) {
        throw new UserDontExistsException("User not found!");
      }

      await this.refreshTokenRepository.revoke(whitelistedRefreshToken.id);

      const { id, name, email } = user;
      const { refreshToken: newRefreshToken, accessToken } =
        await this.generateTokensUseCase.execute({
          userId: id,
          name,
          email,
        });
      return { refreshToken: newRefreshToken, accessToken };
    } catch (err) {
      throw err;
    }
  }
}
