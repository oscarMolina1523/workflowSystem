import { inject, injectable } from "tsyringe";
import LogModel from "../entities/log.model";
import { LogDTO } from "../dtos/log.dto";
import { ServiceResult } from "../utils/serviceResult.type";
import { generateId } from "../utils/generateId";
import { ILogRepository } from "../interfaces/repositories/logRepository.interface";
import { ILogService } from "../interfaces/services/logService.interface";

@injectable()
export default class LogService implements ILogService {
  private readonly _logRepository: ILogRepository;

  constructor(@inject("ILogRepository") logRepository: ILogRepository) {
    this._logRepository = logRepository;
  }

  

  async getLogs(): Promise<LogModel[]> {
    return await this._logRepository.getAll();
  }

  async getByAreaId(id: string): Promise<LogModel[]> {
    return await this._logRepository.getByArea(id);
  }

  async addLog(log: LogDTO): Promise<ServiceResult<LogModel>> {
    const id = generateId();
    const date= new Date();
    const newLog = new LogModel({ id: id, timestamp: date, ...log });
    await this._logRepository.create(newLog);

    return { success: true, message: "Log created", data: newLog };
  }
}
