import BaseModel from "../../Domain.Endpoint/entities/base.model";
import { SqlReadOperation, SqlWriteOperation } from "../builders/sqlOperations.enum";
import { EntityType } from "../utils/entityTypes";
import { SqlCommand } from "./sqlCommand.interface";

export interface ISqlCommandOperationBuilder {
  From<TEntity extends BaseModel>(entityType: EntityType, entity: TEntity): IHaveSqlWriteOperation;
  Initialize(entityType: EntityType): IHaveSqlReadOperation;
}

export interface IHaveSqlWriteOperation {
  WithOperation(operation: SqlWriteOperation): IExecuteWriteBuilder;
}

export interface IExecuteWriteBuilder {
  BuildWritter(): SqlCommand; 
}

export interface IHaveSqlReadOperation {
  WithOperation(operation: SqlReadOperation): IHavePrimaryKeyValue;
}

export interface IHavePrimaryKeyValue extends IExecuteReadBuilder {
  WithId(id: string): IExecuteReadBuilder;

  WithField?(fieldName: string, value: any): IExecuteReadBuilder;
}

export interface IExecuteReadBuilder {
  BuildReader(): SqlCommand; 
}