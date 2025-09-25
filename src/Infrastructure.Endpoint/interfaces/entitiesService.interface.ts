import { SqlEntitySettings } from "../builders/sqlEntitySettings";
import { EntityType } from "../utils/entityTypes";

export interface IEntitiesService{
   GetSettings(type: EntityType): SqlEntitySettings;
}