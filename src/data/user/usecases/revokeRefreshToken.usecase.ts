import { IRevokeRefreshToken } from "@/domains/user/usecases";
import { IRefreshTokenRepository } from "@/domains/user/repositories/refreshTokenRepository";

export class RevokeRefreshTokenUseCase implements IRevokeRefreshToken {
  constructor(
    private readonly refreshTokenRepository: IRefreshTokenRepository
  ) {}

  async execute(
    params: IRevokeRefreshToken.Params
  ): Promise<IRevokeRefreshToken.Result> {
    const { id } = params;

    try {
      await this.refreshTokenRepository.revoke(id);
    } catch (err) {
      throw err;
    }
  }
}
