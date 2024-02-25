import { User } from "../entities";

export type UserFilter = {
  name?: User["name"];
  email?: User["email"];
  order?: keyof User;
  orderBy?: "asc" | "desc";
};

export type CreateUserDTO = Omit<User, "id">;

export interface IUserRepository {
  findById: (id: string) => Promise<User | null>;
  find: (query: UserFilter) => Promise<User[] | []>;
  getAll: () => Promise<User[]> | [];
  delete: (id: string) => Promise<void>;
  update: (id: string, data: Partial<User>) => Promise<User | null>;
  create: (data: CreateUserDTO) => Promise<(User & { id: string }) | null>;
  checkUserByEmail: (email: string) => Promise<boolean>;
}
