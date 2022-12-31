import { Message } from "../entities";

export type MessageFilter = {
  message: string;
  username: string;
};

export interface IMessageRepository {
  findById: (id: number) => Promise<Message | null>;
  findByChat: (chatId: number) => Promise<Message[] | []>;
  findByUser: (userId: number) => Promise<Message[] | []>;
  find: (query: MessageFilter) => Promise<Message[] | []>;
  getAll: () => Promise<Message[]> | [];
  delete: (id: number) => Promise<void>;
  update: (id: number, data: Partial<Message>) => Promise<Message | null>;
  create: (data: Message) => Promise<Message | null>;
}
