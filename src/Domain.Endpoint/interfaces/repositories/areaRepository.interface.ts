import Area from "../../entities/area.model";

export interface IAreaRepository {
  getAll(): Promise<Area[]>;
  getById(id: string): Promise<Area | null>;
  create(area: Area): Promise<void>;
  update(area: Area): Promise<void>;
  delete(area: Area): Promise<void>;
}
