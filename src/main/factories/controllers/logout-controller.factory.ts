import { LogoutUseCase } from "@/data/user/usecases";
import { LogoutController } from "@/presentation/controllers";

export const logoutControllerFactory = () => {
  const logoutUseCase = new LogoutUseCase();
  return new LogoutController(logoutUseCase);
};
