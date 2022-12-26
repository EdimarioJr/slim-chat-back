import { ILogoutUseCase } from "@/domains/user/usecases";

export class LogoutUseCase implements ILogoutUseCase {
  constructor() {}

  async execute(): Promise<ILogoutUseCase.Result> {
    return { accessToken: null };
  }
}
