import { EntityType } from "../utils/entityTypes";
import {
  SqlEntitySettings,
  SqlColumnSettings,
} from "../builders/sqlEntitySettings";
import { IEntitiesService } from "../interfaces/entitiesService.interface";
import { injectable } from "tsyringe";

@injectable()
export class EntitiesService implements IEntitiesService {
  private entities = new Map<EntityType, SqlEntitySettings>();

  constructor() {
    this.buildEntities();
  }

  GetSettings(type: EntityType): SqlEntitySettings {
    const settings = this.entities.get(type);
    if (!settings) {
      throw new Error(`Entidad no encontrada: ${type}`);
    }
    return settings;
  }

  private buildEntities(): void {
    const roleSettings = this.getRoleSettings();
    const areaSettings = this.getAreaSettings();
    const userSettings = this.getUserSettings();
    const taskSettings = this.getTaskSettings();
    const logSettings = this.getLogSettings();
    this.entities.set(EntityType.Role, roleSettings);
    this.entities.set(EntityType.Area, areaSettings);
    this.entities.set(EntityType.User, userSettings);
    this.entities.set(EntityType.Task, taskSettings);
    this.entities.set(EntityType.Log, logSettings);
  }

  private getRoleSettings(): SqlEntitySettings {
    const columns: SqlColumnSettings[] = [
      new SqlColumnSettings("ID", "id", true),
      new SqlColumnSettings("NAME", "name", false),
      new SqlColumnSettings("DESCRIPTION", "description", false),
    ];

    // Se define el nombre de la tabla para el modelo Role
    return new SqlEntitySettings("ROLES", columns);
  }

  private getLogSettings(): SqlEntitySettings {
    const columns: SqlColumnSettings[] = [
      new SqlColumnSettings("ID", "id", true),
      new SqlColumnSettings("USER_ID", "userId", false), 
      new SqlColumnSettings("ACTION", "action", false), 
      new SqlColumnSettings("AREA_ID", "areaId", false), 
      new SqlColumnSettings("TIMESTAMP", "timestamp", false),
    ];

    // Se define el nombre de la tabla para el modelo Role
    return new SqlEntitySettings("LOGS", columns);
  }

  private getAreaSettings(): SqlEntitySettings {
    const columns: SqlColumnSettings[] = [
      new SqlColumnSettings("ID", "id", true),
      new SqlColumnSettings("TITLE", "title", false),
      new SqlColumnSettings("DESCRIPTION", "description", false),
    ];

    // Se define el nombre de la tabla para el modelo Area
    return new SqlEntitySettings("AREAS", columns);
  }

  private getUserSettings(): SqlEntitySettings {
    const columns: SqlColumnSettings[] = [
      new SqlColumnSettings("ID", "id", true),
      new SqlColumnSettings("NAME", "name", false),
      new SqlColumnSettings("EMAIL", "email", false),
      new SqlColumnSettings("PASSWORD", "password", false),
      new SqlColumnSettings("AREA_ID", "areaId", false),
      new SqlColumnSettings("ROLE_ID", "roleId", false),
    ];

    // Se define el nombre de la tabla para el modelo User
    return new SqlEntitySettings("USERS", columns);
  }

  private getTaskSettings(): SqlEntitySettings {
    const columns: SqlColumnSettings[] = [
      new SqlColumnSettings("ID", "id", true),
      new SqlColumnSettings("TITLE", "title", false),
      new SqlColumnSettings("DESCRIPTION", "description", false),
      new SqlColumnSettings("STATUS", "status", false),
      new SqlColumnSettings("AREA_ID", "areaId", false),
      new SqlColumnSettings("CREATED_BY", "createdBy", false),
      new SqlColumnSettings("ASSIGNED_TO", "assignedTo", false),
    ];

    // Se define el nombre de la tabla para el modelo Task
    return new SqlEntitySettings("TASKS", columns);
  }
}
