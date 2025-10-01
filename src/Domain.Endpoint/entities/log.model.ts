import BaseModel from "./base.model";
import { Log } from "./log.enum";

export default class LogModel extends BaseModel {
  userId: string; // quién hizo la acción
  action: Log;      //accion realizada
  areaId: string; // área asociada
  timestamp: Date; // fecha y hora exacta

  constructor({
    id,
    userId,
    action,
    areaId,
    timestamp,
  }: {
    id: string;
    userId: string;
    action: Log;
    areaId: string;
    timestamp: Date;
  }) {
    super(id);
    this.userId = userId;
    this.action = action;
    this.areaId = areaId;
    this.timestamp = timestamp;
  }
}
