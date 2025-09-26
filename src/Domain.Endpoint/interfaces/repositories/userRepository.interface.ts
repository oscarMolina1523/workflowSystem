import { User } from "../../entities/user.model";

export interface IUserRepository {
  getAll(): Promise<User[]>;
  getById(id: string): Promise<User | null>;
  getByEmail(id: string): Promise<User | null>;
  create(User: User): Promise<void>;
  update(User: User): Promise<void>;
  delete(User: User): Promise<void>;
}