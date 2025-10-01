import { inject, injectable } from "tsyringe";
import { UserDTO } from "../dtos/user.dto";
import { User } from "../entities/user.model";
import { IUserService } from "../interfaces/services/userService.interfaz";
import { ServiceResult } from "../utils/serviceResult.type";
import { IUserRepository } from "../interfaces/repositories/userRepository.interface";
import { generateId } from "../utils/generateId";

@injectable()
export default class UserService implements IUserService {
  private readonly _userRepository: IUserRepository;
  constructor(@inject("IUserRepository") userRepository: IUserRepository) {
    this._userRepository = userRepository;
  }

  async getUsers(): Promise<User[]> {
    return await this._userRepository.getAll();
  }

  async getById(id: string): Promise<User | null> {
    return await this._userRepository.getById(id);
  }

  async getByEmail(email: string): Promise<User | null> {
    return await this._userRepository.getByEmail(email);
  }

  async getByAreaId(areaId: string): Promise<User[]> {
    return await this._userRepository.getByAreaId(areaId);
  }

  async addUser(user: UserDTO): Promise<ServiceResult<User>> {
    const id = generateId();
    const newUser = new User({
      id,
      name: user.name!, 
      email: user.email,
      password: user.password,
      areaId: user.areaId,
      roleId: user.roleId ?? "d9e8f7g6-5h4i-3j2k-1l0m-9n8o7p6q5r4s",//viewer por defecto
    });
    await this._userRepository.create(newUser);

    return { success: true, message: "User created", data: newUser };
  }

  async updateUser(id: string, user: UserDTO): Promise<ServiceResult<User | null>> {
    const existing = await this._userRepository.getById(id);
    if (!existing) {
      return { success: false, message: "User not found", data: null };
    }

    // actualizar solo las propiedades necesarias
    Object.assign(existing, user);
    await this._userRepository.update(existing);

    return { success: true, message: "User updated", data: existing };
  }

  async deleteUser(id: string): Promise<{ success: boolean; message: string }> {
    const existing = await this._userRepository.getById(id);
    if (!existing) {
      return { success: false, message: "User not found" };
    }

    await this._userRepository.delete(existing);
    return { success: true, message: "User deleted" };
  }
}
