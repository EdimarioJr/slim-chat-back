import { User } from "@/domains/user";
import { Chat } from "../entities";

export type GetChatDTO = Omit<Chat, "messages" | "members" | "createdBy"> & {
  createdBy: Omit<User, "password">;
};
