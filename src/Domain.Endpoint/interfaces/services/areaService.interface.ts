import { AreaDTO } from "../../dtos/area.dto";
import Area from "../../entities/area.model";
import { ServiceResult } from "../../utils/serviceResult.type";

export interface IAreaService {
  getAreas(): Promise<Area[]>;
  getById(id: string): Promise<Area | null>;
  addArea(area: AreaDTO): Promise<ServiceResult<Area>>;
  updateArea(id: string, area: AreaDTO): Promise<ServiceResult<Area | null>>;
  deleteArea(id: string): Promise<{ success: boolean; message: string }>;
}
