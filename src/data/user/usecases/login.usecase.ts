import { IUserRepository } from "@/domains/user/repositories";
import { ILoginUseCase } from "@/domains/user/usecases";
import { ICrypt } from "@/shared/domain/protocols/crypt";
import { IJwt } from "@/shared/domain/protocols/jwt";
import { UserDontExistsException } from "../exceptions";
import { IncorrectPasswordException } from "../exceptions/incorrectPassword.error";

export class LoginUseCase implements ILoginUseCase {
  constructor(
    private readonly userRepository: IUserRepository,
    private readonly jwt: IJwt,
    private readonly crypter: ICrypt
  ) {}

  async execute(params: ILoginUseCase.Params): Promise<ILoginUseCase.Result> {
    const { email, password } = params;
    const userExists = await this.userRepository.checkUserByEmail(email);
    if (!userExists) throw new UserDontExistsException("User dont exist");

    const user = await this.userRepository.find({ email });
    console.log("usuario", user);
    const passwordIsCorrect = this.crypter.compare(password, user[0].password);

    if (!passwordIsCorrect)
      throw new IncorrectPasswordException("Incorrect Password");

    try {
      const accessToken = this.jwt.generate({ id: user[0].id });
      return { accessToken };
    } catch (err) {
      throw err;
    }
  }
}
