import { inject, injectable } from "tsyringe";
import LogModel from "../entities/log.model";
import { ILogService } from "../interfaces/services/logService.interface";

@injectable()
export default class LogService implements ILogService {
  private readonly _logRepository: ILogService;

  constructor(@inject("ILogService") areaRepository: ILogService) {
    this._logRepository = areaRepository;
  }
  async getLogs(): Promise<LogModel[]> {
    return await this._logRepository.getLogs();
  }

  async getByAreaId(id: string): Promise<LogModel[]> {
    return await this._logRepository.getByAreaId(id);
  }
}
