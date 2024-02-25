import { RefreshToken } from "../entities";

export type CreateRefreshTokenDTO = {
  refreshToken: string;
  jti: string;
  userId: string;
};

export interface IRefreshTokenRepository {
  findById: (id: string) => Promise<RefreshToken>;
  revoke: (id: string) => Promise<void>;
  create: (data: CreateRefreshTokenDTO) => Promise<RefreshToken>;
}
