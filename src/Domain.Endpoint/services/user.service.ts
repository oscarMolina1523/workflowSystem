import { UserDTO } from "../dtos/user.dto";
import { User } from "../entities/user.model";
import { IUserService } from "../interfaces/services/userService.interfaz";
import { ServiceResult } from "../utils/serviceResult.type";

export default class UserService implements IUserService{
    getUsers(): Promise<User[]> {
        throw new Error("Method not implemented.");
    }
    getById(id: string): Promise<User | null> {
        throw new Error("Method not implemented.");
    }
    getByEmail(email: string): Promise<User | null> {
        throw new Error("Method not implemented.");
    }
    addUser(user: UserDTO): Promise<ServiceResult<User>> {
        throw new Error("Method not implemented.");
    }
    updateUser(id: string, user: UserDTO): Promise<ServiceResult<User | null>> {
        throw new Error("Method not implemented.");
    }
    deleteUser(id: string): Promise<{ success: boolean; message: string; }> {
        throw new Error("Method not implemented.");
    }

}