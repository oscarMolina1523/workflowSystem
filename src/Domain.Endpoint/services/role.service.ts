import { inject, injectable } from "tsyringe";
import { RoleDTO } from "../dtos/role.dto";
import Role from "../entities/role.model";
import { ServiceResult } from "../utils/serviceResult.type";
import { IRoleRepository } from "../interfaces/repositories/roleRepository.interface";
import { IRoleService } from "../interfaces/services/roleService.interface";
import { generateId } from "../utils/generateId";

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

  async addRole(role: RoleDTO): Promise<ServiceResult<Role>> {
    const id = generateId();
    const newRole = new Role({ id: id, ...role });
    await this._roleRepository.create(newRole);

    return { success: true, message: "Role created", data: newRole };
  }

  async updateRole(id: string, role: RoleDTO): Promise<ServiceResult<Role | null>> {
    const existing = await this._roleRepository.getById(id);
    if (!existing) {
      return { success: false, message: "Role not found", data: null };
    }

    // actualizar solo las propiedades necesarias
    Object.assign(existing, role);
    await this._roleRepository.update(existing);

    return { success: true, message: "Role updated", data: existing };
  }

  async deleteRole(id: string): Promise<{ success: boolean; message: string }> {
    const existing = await this._roleRepository.getById(id);
    if (!existing) {
      return { success: false, message: "Role not found" };
    }

    await this._roleRepository.delete(existing);
    return { success: true, message: "Role deleted" };
  }
}
