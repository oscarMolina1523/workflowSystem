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

  updateRole(id: string, role: RoleDTO): Promise<ServiceResult<Role | null>> {
    throw new Error("Method not implemented.");
  }
  deleteRole(id: string): Promise<{ success: boolean; message: string }> {
    throw new Error("Method not implemented.");
  }
}
