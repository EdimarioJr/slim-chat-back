import { LoginController } from "@/presentation/controllers";
import { loginUseCaseFactory } from "../usecases";

export const loginControllerFactory = () => {
  const loginUseCase = loginUseCaseFactory();
  return new LoginController(loginUseCase);
};
