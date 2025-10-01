import LogModel from "../../entities/log.model";

export interface ILogRepository {
  getAll(): Promise<LogModel[]>;
  getByArea(areaId: string): Promise<LogModel[]>;
}
