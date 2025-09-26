import { User } from "../entities/user.model";

export interface UserDTO {
  name?: string;
  email: string;
  password: string;
  areaId: string;
  roleId?: string;
}

export type PublicUser = Omit<User, "password">;