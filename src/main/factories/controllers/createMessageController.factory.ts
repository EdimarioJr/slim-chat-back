import { CreateMessageController } from "@/presentation/controllers";
import { createMessageUseCaseFactory } from "../usecases";

export const createMessageControllerFactory = () => {
  const createMessageUseCase = createMessageUseCaseFactory();
  return new CreateMessageController(createMessageUseCase);
};
