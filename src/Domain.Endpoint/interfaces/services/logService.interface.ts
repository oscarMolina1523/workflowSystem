import { LogDTO } from "../../dtos/log.dto";
import LogModel from "../../entities/log.model";
import { ServiceResult } from "../../utils/serviceResult.type";

export interface ILogService {
  getLogs(): Promise<LogModel[]>;
  getByAreaId(id: string): Promise<LogModel[]>;
  addLog(log: LogDTO): Promise<ServiceResult<LogModel>>;
}
