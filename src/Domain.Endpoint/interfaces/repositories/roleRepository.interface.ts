import Role from "../../entities/role.model";

export interface IRoleRepository {
  getAll(): Promise<Role[]>;
  getById(id: string): Promise<Role | null>;
  create(role: Role): Promise<void>;
  update(role: Role): Promise<void>;
  delete(role: Role): Promise<void>;
}
