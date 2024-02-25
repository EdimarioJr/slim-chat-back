import { IGenerateTokensUseCase } from "@/domains/user/usecases";
import { ICrypt } from "@/shared/domain/protocols/crypt";
import { IJwt } from "@/shared/domain/protocols/jwt";
import { IRefreshTokenRepository } from "@/domains/user/repositories/refreshTokenRepository";
import { IUUID } from "@/shared/domain/protocols/uuid";

export class GenerateTokensUseCase implements IGenerateTokensUseCase {
  constructor(
    private readonly refreshTokenRepository: IRefreshTokenRepository,
    private readonly jwt: IJwt,
    private readonly crypter: ICrypt,
    private readonly UUID: IUUID
  ) {}

  async execute(
    params: IGenerateTokensUseCase.Params
  ): Promise<IGenerateTokensUseCase.Result> {
    const { userId, name, email } = params;

    try {
      const jti = this.UUID.generate();
      const token = this.jwt.generate(
        { userId, jti },
        {
          expiresIn: "8h",
          algorithm: "HS256",
        }
      );

      const accessToken = this.jwt.generate(
        { userId, email, name },
        {
          expiresIn: "5m",
          algorithm: "HS256",
        }
      );
      const hashedToken = this.crypter.encrypt(token);

      await this.refreshTokenRepository.create({
        jti,
        refreshToken: hashedToken,
        userId,
      });

      return { refreshToken: token, accessToken };
    } catch (err) {
      throw err;
    }
  }
}
