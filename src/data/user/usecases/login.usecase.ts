import { IUserRepository } from "@/domains/user/repositories";
import { IGenerateTokensUseCase, ILoginUseCase } from "@/domains/user/usecases";
import { ICrypt } from "@/shared/domain/protocols/crypt";
import { UserDontExistsException } from "../exceptions";
import { IncorrectPasswordException } from "../exceptions/incorrectPassword.error";

export class LoginUseCase implements ILoginUseCase {
  constructor(
    private readonly userRepository: IUserRepository,
    private readonly crypter: ICrypt,
    private readonly generateTokens: IGenerateTokensUseCase
  ) {}

  async execute(params: ILoginUseCase.Params): Promise<ILoginUseCase.Result> {
    const { email, password } = params;

    const userExists = await this.userRepository.checkUserByEmail(email);
    if (!userExists) throw new UserDontExistsException("User don't exist");

    const user = await this.userRepository.find({ email });

    const passwordIsCorrect = this.crypter.compare(password, user[0].password);

    if (!passwordIsCorrect)
      throw new IncorrectPasswordException("Incorrect Password");

    try {
      const { id, email, name } = user[0];
      const { accessToken, refreshToken } = await this.generateTokens.execute({
        userId: id,
        email,
        name,
      });
      return { accessToken, refreshToken };
    } catch (err) {
      throw err;
    }
  }
}
