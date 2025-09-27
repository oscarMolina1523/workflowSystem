import { inject, injectable } from "tsyringe";
import { AreaDTO } from "../dtos/area.dto";
import Area from "../entities/area.model";
import { IAreaService } from "../interfaces/services/areaService.interface";
import { ServiceResult } from "../utils/serviceResult.type";
import { IAreaRepository } from "../interfaces/repositories/areaRepository.interface";
import { generateId } from "../utils/generateId";

@injectable()
export class AreaService implements IAreaService {
  private readonly _areaRepository: IAreaRepository;

  constructor(@inject("IAreaRepository") areaRepository: IAreaRepository) {
    this._areaRepository = areaRepository;
  }

  async getAreas(): Promise<Area[]> {
    return await this._areaRepository.getAll();
  }

  async getById(id: string): Promise<Area | null> {
    return await this._areaRepository.getById(id);
  }

  async addArea(area: AreaDTO): Promise<ServiceResult<Area>> {
    const id = generateId();
    const newArea = new Area({ id: id, ...area });
    await this._areaRepository.create(newArea);

    return { success: true, message: "Area created", data: newArea };
  }

  async updateArea(id: string, area: AreaDTO): Promise<ServiceResult<Area | null>> {
    const existing = await this._areaRepository.getById(id);
    if (!existing) {
      return { success: false, message: "Area not found", data: null };
    }

    // actualizar solo las propiedades necesarias
    Object.assign(existing, area);
    await this._areaRepository.update(existing);

    return { success: true, message: "Area updated", data: existing };
  }

  async deleteArea(id: string): Promise<{ success: boolean; message: string }> {
    const existing = await this._areaRepository.getById(id);
    if (!existing) {
      return { success: false, message: "Area not found" };
    }

    await this._areaRepository.delete(existing);
    return { success: true, message: "Area deleted" };
  }
}
