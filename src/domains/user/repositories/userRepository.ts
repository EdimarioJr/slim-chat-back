import { User } from "../entities";

export type UserFilter = {
  name?: User["name"];
  email?: User["email"];
  order?: keyof User;
  orderBy?: "asc" | "desc";
};

export interface IUserRepository {
  findById: (id: number) => Promise<User | null>;
  find: (query: UserFilter) => Promise<User[] | []>;
  getAll: () => Promise<User[]> | [];
  delete: (id: number) => Promise<void>;
  update: (id: number, data: Partial<User>) => Promise<User | null>;
  create: (data: User) => Promise<(User & { id: number }) | null>;
  checkUserByEmail: (email: string) => Promise<boolean>;
}
