import { UserDTO } from "../../dtos/user.dto";
import { User } from "../../entities/user.model";
import { ServiceResult } from "../../utils/serviceResult.type";

export interface IUserService {
  getUsers(): Promise<User[]>;
  getById(id: string): Promise<User | null>;
  getByEmail(email: string): Promise<User | null>;
  addUser(user: UserDTO): Promise<ServiceResult<User>>;
  updateUser(id: string, user: UserDTO): Promise<ServiceResult<User | null>>;
  deleteUser(id: string): Promise<{ success: boolean; message: string }>;
}
