import { inject, injectable } from "tsyringe";
import { RoleDTO } from "../dtos/role.dto";
import Role from "../entities/role.model";
import { ServiceResult } from "../utils/serviceResult.type";
import { IRoleRepository } from "../interfaces/repositories/roleRepository.interface";
import { IRoleService } from "../interfaces/services/roleService.interface";

@injectable()
export default class RoleService implements IRoleService {
  private readonly _roleRepository: IRoleRepository;

  constructor(@inject("IRoleRepository") roleRepository: IRoleRepository) {
    this._roleRepository = roleRepository;
  }

  async getRoles(): Promise<Role[]> {
    return await this._roleRepository.getAll();
  }

  async getById(id: string): Promise<Role | null> {
   return await this._roleRepository.getById(id);
  }

  addRole(role: RoleDTO): Promise<ServiceResult<Role>> {
    throw new Error("Method not implemented.");
  }
  updateRole(id: string, role: RoleDTO): Promise<ServiceResult<Role | null>> {
    throw new Error("Method not implemented.");
  }
  deleteRole(id: string): Promise<{ success: boolean; message: string }> {
    throw new Error("Method not implemented.");
  }
}
