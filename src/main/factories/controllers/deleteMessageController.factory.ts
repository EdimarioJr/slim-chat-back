import { DeleteMessageController } from "@/presentation/controllers";
import { deleteMessageUseCaseFactory } from "../usecases";

export const deleteMessageControllerFactory = () => {
  const deleteMessageUseCase = deleteMessageUseCaseFactory();
  return new DeleteMessageController(deleteMessageUseCase);
};
