import { GetChatDTO } from "../dtos/getChat.dto";
import { CreateChatDTO, ICreateChatUseCase, UpdateChatDTO } from "../usecases";

export type ChatFilter = {
  name: string;
};

export interface IChatRepository {
  findById: (id: string) => Promise<GetChatDTO>;
  findByUser: (userId: string) => Promise<GetChatDTO[] | []>;
  find: (query: ChatFilter) => Promise<GetChatDTO[] | []>;
  delete: (id: string) => Promise<void>;
  update: (id: string, data: UpdateChatDTO) => Promise<GetChatDTO>;
  create: (data: CreateChatDTO) => Promise<ICreateChatUseCase.Result>;
}
