import { IGetRefreshTokenById } from "@/domains/user/usecases";

import { IRefreshTokenRepository } from "@/domains/user/repositories/refreshTokenRepository";

export class GetRefreshTokenByIdUseCase implements IGetRefreshTokenById {
  constructor(
    private readonly refreshTokenRepository: IRefreshTokenRepository
  ) {}

  async execute(
    params: IGetRefreshTokenById.Params
  ): Promise<IGetRefreshTokenById.Result> {
    const { id } = params;

    try {
      const refreshToken = await this.refreshTokenRepository.findById(id);
      return { token: refreshToken };
    } catch (err) {
      throw err;
    }
  }
}
