import { IUserRepository } from "@/domains/user/repositories";
import { IRegisterUseCase } from "@/domains/user/usecases";
import { UnknownException } from "@/shared/domain/exceptions";
import { ICrypt } from "@/shared/domain/protocols/crypt";
import { IJwt } from "@/shared/domain/protocols/jwt";
import {
  CreatingUserException,
  UserAlreadyExistsException,
} from "../exceptions";

export class RegisterUseCase implements IRegisterUseCase {
  constructor(
    private readonly userRepository: IUserRepository,
    private readonly crypter: ICrypt,
    private readonly jwt: IJwt
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

      const accessToken = this.jwt.generate({
        name: newUser.name,
        email: newUser?.email,
        id: newUser.id,
      });
      return { accessToken, user: newUser };
    } catch (err) {
      throw err;
    }
  }
}
