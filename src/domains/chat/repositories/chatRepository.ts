import { Chat } from "../entities";

export type ChatFilter = {
  name: string;
};

export interface IChatRepository {
  findById: (id: number) => Promise<Chat | null>;
  findByUser: (userId: number) => Promise<Chat[] | []>;
  find: (query: ChatFilter) => Promise<Chat[] | []>;
  getAll: () => Promise<Chat[]> | [];
  delete: (id: number) => Promise<void>;
  update: (id: number, data: Partial<Chat>) => Promise<Chat | null>;
  create: (data: Chat) => Promise<Chat | null>;
}
