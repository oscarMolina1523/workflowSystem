import Area from "../../entities/area.model";

export interface IAreaRepository {
  getAll(): Promise<Area[]>;
  getById(id: string): Promise<Area | null>;
  create(role: Area): Promise<void>;
  update(role: Area): Promise<void>;
  delete(role: Area): Promise<void>;
}
