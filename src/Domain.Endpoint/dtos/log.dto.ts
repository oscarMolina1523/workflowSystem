import { Log } from "../entities/log.enum";

export interface LogDTO {
  userId: string;
  action: Log;
  areaId: string;
  timestamp?: Date; 
}
