import { RoleDTO } from "../../dtos/role.dto";
import Role from "../../entities/role.model";
import { ServiceResult } from "../../utils/serviceResult.type";

export interface IRoleService {
  getRoles(): Promise<Role[]>;
  getById(id: string): Promise<Role | null>;
  addRole(role: RoleDTO): Promise<ServiceResult<Role>>;
  updateRole(id: string, role: RoleDTO): Promise<ServiceResult<Role | null>>;
  deleteRole(id: string): Promise<{ success: boolean; message: string }>;
}
