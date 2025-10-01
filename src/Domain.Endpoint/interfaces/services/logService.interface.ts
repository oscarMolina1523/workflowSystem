import LogModel from "../../entities/log.model";

export interface ILogService {
  getLogs(): Promise<LogModel[]>;
  getByAreaId(id: string): Promise<LogModel[]>;
}
