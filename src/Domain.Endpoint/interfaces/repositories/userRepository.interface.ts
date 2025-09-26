import { User } from "../../entities/user.model";

export interface IUserRepository {
  getAll(): Promise<User[]>;
  getById(id: string): Promise<User | null>;
  getByEmail(id: string): Promise<User | null>;
  create(user: User): Promise<void>;
  update(user: User): Promise<void>;
  delete(user: User): Promise<void>;
}