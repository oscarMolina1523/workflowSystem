import { RoleDTO } from "../dtos/role.dto";
import Role from "../entities/role.model";
import { IRoleService } from "../interfaces/services/roleService.interface";
import { ServiceResult } from "../utils/serviceResult.type";

export default class RoleService implements IRoleService {
    getRoles(): Promise<Role[]> {
        throw new Error("Method not implemented.");
    }
    getById(id: string): Promise<Role | null> {
        throw new Error("Method not implemented.");
    }
    addRole(role: RoleDTO): Promise<ServiceResult<Role>> {
        throw new Error("Method not implemented.");
    }
    updateRole(id: string, role: RoleDTO): Promise<ServiceResult<Role | null>> {
        throw new Error("Method not implemented.");
    }
    deleteRole(id: string): Promise<{ success: boolean; message: string; }> {
        throw new Error("Method not implemented.");
    }

}