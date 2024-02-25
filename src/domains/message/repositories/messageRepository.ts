import { Message } from "../entities";
import { ICreateMessageUseCase } from "../usecases";

export type MessageFilter = {
  message: string;
  username: string;
};

export type CreateMessageDTO = Omit<
  Message,
  "id" | "createdAt" | "createdBy"
> & { createdById: string };

export type UpdateMessageDTO = Omit<Partial<Message>, "createdBy">;

export interface IMessageRepository {
  findByChat: (chatId: string) => Promise<Message[]>;
  findByUser: (userId: string) => Promise<Message[]>;
  getAll: () => Promise<Message[]>;
  delete: (id: string) => Promise<void>;
  update: (id: string, data: UpdateMessageDTO) => Promise<Message | null>;
  create: (data: CreateMessageDTO) => Promise<ICreateMessageUseCase.Result>;
}
