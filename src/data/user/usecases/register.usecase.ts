import { IUserRepository } from "@/domains/user/repositories";
import {
  IGenerateTokensUseCase,
  IRegisterUseCase,
} from "@/domains/user/usecases";
import { ICrypt } from "@/shared/domain/protocols/crypt";
import {
  CreatingUserException,
  UserAlreadyExistsException,
} from "../exceptions";

export class RegisterUseCase implements IRegisterUseCase {
  constructor(
    private readonly userRepository: IUserRepository,
    private readonly crypter: ICrypt,
    private readonly generateTokens: IGenerateTokensUseCase
  ) {}

  async execute({
    name,
    email,
    profilePhoto,
    password,
  }: IRegisterUseCase.Params): Promise<IRegisterUseCase.Result> {
    const userExists = await this.userRepository.checkUserByEmail(email);
    if (userExists)
      throw new UserAlreadyExistsException("User already exists!");

    try {
      const cryptedPassword = this.crypter.encrypt(password);

      const newUser = await this.userRepository.create({
        name,
        email,
        profilePhoto,
        password: cryptedPassword,
      });
      if (!newUser) throw new CreatingUserException("Error creating user!");

      const { accessToken, refreshToken } = await this.generateTokens.execute({
        name: newUser.name,
        email: newUser?.email,
        userId: newUser.id,
      });

      return { accessToken, refreshToken };
    } catch (err) {
      throw err;
    }
  }
}
