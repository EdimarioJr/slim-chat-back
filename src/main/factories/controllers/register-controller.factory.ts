import { RegisterController } from "@/presentation/controllers/RegisterController";
import { registerUsecaseFactory } from "../usecases";

export const registerControllerFactory = () => {
  const registerUseCase = registerUsecaseFactory();
  return new RegisterController(registerUseCase);
};
