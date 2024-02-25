import { RegisterController } from "@/presentation/controllers";
import { registerUseCaseFactory } from "../usecases";

export const registerControllerFactory = () => {
  const registerUseCase = registerUseCaseFactory();
  return new RegisterController(registerUseCase);
};
