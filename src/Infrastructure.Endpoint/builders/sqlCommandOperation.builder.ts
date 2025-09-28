import { SqlReadOperation, SqlWriteOperation } from "./sqlOperations.enum";
import { SqlColumnSettings } from "./sqlEntitySettings";
import { SqlCommand } from "../interfaces/sqlCommand.interface";
import BaseModel from "../../Domain.Endpoint/entities/base.model";
import { EntityType } from "../utils/entityTypes";
import {
  IExecuteReadBuilder,
  IExecuteWriteBuilder,
  IHavePrimaryKeyValue,
  IHaveSqlReadOperation,
  IHaveSqlWriteOperation,
  ISqlCommandOperationBuilder,
} from "../interfaces/sqlCommandOperation.interface";
import { IEntitiesService } from "../interfaces/entitiesService.interface";
import { inject, injectable } from "tsyringe";
@injectable()
export class SqlCommandOperationBuilder implements ISqlCommandOperationBuilder {
  private readonly _entitiesService: IEntitiesService;

  constructor(@inject("IEntityService") entitiesService: IEntitiesService) {
    this._entitiesService = entitiesService;
  }

  From<TEntity extends BaseModel>(
    entityType: EntityType,
    entity: TEntity
  ): IHaveSqlWriteOperation {
    return new SqlCommandWriteBuilder<TEntity>(
      this._entitiesService,
      entityType,
      entity
    );
  }

  Initialize<TEntity extends BaseModel>(
    entityType: EntityType
  ): IHaveSqlReadOperation {
    return new SqlCommandReadBuilder<TEntity>(
      this._entitiesService,
      entityType
    );
  }
}

export class SqlCommandWriteBuilder<TEntity extends BaseModel>
  implements IHaveSqlWriteOperation, IExecuteWriteBuilder
{
  private operation!: SqlWriteOperation;
  private readonly entity: TEntity;
  private readonly entityType: EntityType;
  private readonly entitiesService: IEntitiesService;

  constructor(
    entitiesService: IEntitiesService,
    entityType: EntityType,
    entity: TEntity
  ) {
    this.entity = entity;
    this.entitiesService = entitiesService;
    this.entityType = entityType;
  }

  WithOperation(operation: SqlWriteOperation): IExecuteWriteBuilder {
    this.operation = operation;
    return this;
  }

  BuildWritter(): SqlCommand {
    switch (this.operation) {
      case SqlWriteOperation.Create:
        return this.getInsertCommand();
      case SqlWriteOperation.Update:
        return this.getUpdateCommand();
      case SqlWriteOperation.Delete:
        return this.getDeleteCommand();
      default:
        throw new Error("Invalid write operation.");
    }
  }

  private getInsertCommand(): SqlCommand {
    const entitySettings = this.entitiesService.GetSettings(this.entityType);
    const sqlQuery = this.getInsertQuery(
      entitySettings.tableName,
      entitySettings.columns
    );
    const parameters = this.getSqlParameters(entitySettings.columns);
    return { query: sqlQuery, parameters };
  }

  private getInsertQuery(
    entityName: string,
    columns: SqlColumnSettings[]
  ): string {
    const columnNames = columns.map((c) => c.name);
    const parameterNames = columns.map((c) => c.parameterName);
    return `INSERT INTO ${entityName} (${columnNames.join(
      ", "
    )}) VALUES (${parameterNames.join(", ")});`;
  }

  private getUpdateCommand(): SqlCommand {
    const entitySettings = this.entitiesService.GetSettings(this.entityType);
    const sqlQuery = this.getUpdateQuery(
      entitySettings.tableName,
      entitySettings.columns
    );
    const parameters = this.getSqlParameters(entitySettings.columns);
    return { query: sqlQuery, parameters };
  }

  private getUpdateQuery(
    entityName: string,
    columns: SqlColumnSettings[]
  ): string {
    const primaryKey = columns.find((c) => c.isPrimaryKey);
    if (!primaryKey) throw new Error("No primary key found for update.");

    const setClauses = columns
      .filter((c) => !c.isPrimaryKey)
      .map((c) => `${c.name} = ${c.parameterName}`);

    return `UPDATE ${entityName} SET ${setClauses.join(", ")} WHERE ${
      primaryKey.name
    } = ${primaryKey.parameterName};`;
  }

  private getDeleteCommand(): SqlCommand {
    const entitySettings = this.entitiesService.GetSettings(this.entityType);
    const primaryKey = entitySettings.columns.find((c) => c.isPrimaryKey);
    if (!primaryKey) throw new Error("No primary key found for delete.");
    const sqlQuery = this.getDeleteQuery(
      entitySettings.tableName,
      entitySettings.columns
    );
    //const parameters = this.getSqlParameters(entitySettings.columns);
    const parameters = [
      {
        name: primaryKey.parameterName,
        value: (this.entity as any)[primaryKey.domainName],
      },
    ];
    return { query: sqlQuery, parameters };
  }

  private getDeleteQuery(
    entityName: string,
    columns: SqlColumnSettings[]
  ): string {
    const primaryKey = columns.find((c) => c.isPrimaryKey);
    if (!primaryKey) throw new Error("No primary key found for delete.");
    return `DELETE FROM ${entityName} WHERE ${primaryKey.name} = ${primaryKey.parameterName};`;
  }

  //funcion para obtener los parametros y el valor a insertar con los parametros
  //ej: @name es el parameter "oscar" seria el value
  private getSqlParameters(
    columns: SqlColumnSettings[]
  ): { name: string; value: any }[] {
    return columns.map((c) => ({
      name: c.parameterName,
      value: (this.entity as any)[c.domainName] ?? null,
    }));
  }
}

export class SqlCommandReadBuilder<TEntity extends BaseModel>
  implements IHaveSqlReadOperation, IExecuteReadBuilder, IHavePrimaryKeyValue
{
  private operation!: SqlReadOperation;
  private readonly entitiesService: IEntitiesService;
  private entityType: EntityType;
  private idValue?: string; // se guarda el Id si la operación es GetById
  private fieldName?: string; // se guarda el nombre del campo para operaciones futuras
  private fieldValue?: any; // se guarda el valor del campo para operaciones futuras

  constructor(entitiesService: IEntitiesService, entityType: EntityType) {
    this.entitiesService = entitiesService;
    this.entityType = entityType;
  }

  WithOperation(operation: SqlReadOperation): IHavePrimaryKeyValue {
    this.operation = operation;
    return this;
  }

  WithId(id: string): IExecuteReadBuilder {
    this.idValue = id;
    return this;
  }

  WithField(fieldName: string, value: any): IExecuteReadBuilder {
    this.fieldName = fieldName;
    this.fieldValue = value;
    return this;
  }

  BuildReader(): SqlCommand {
    switch (this.operation) {
      case SqlReadOperation.Select:
        return this.getSelectAllCommand();
      case SqlReadOperation.SelectById:
        return this.getSelectByIdCommand();
      case SqlReadOperation.SelectByField:
        return this.getSelectByFieldCommand();
      default:
        throw new Error("Invalid read operation.");
    }
  }

  private getSelectAllCommand(): SqlCommand {
    const entitySettings = this.entitiesService.GetSettings(this.entityType);
    const sqlQuery = this.getSelectAllQuery(
      entitySettings.tableName,
      entitySettings.columns
    );
    return { query: sqlQuery, parameters: [] };
  }

  private getSelectAllQuery(
    entityName: string,
    columns: SqlColumnSettings[],
    limit = 100
  ): string {
    const columnNames = columns.map((c) => c.name).join(", ");
    return `SELECT ${columnNames} FROM ${entityName} LIMIT ${limit};`; //limit es para solo traer 100 registros
  }

  private getSelectByIdCommand(): SqlCommand {
    const entitySettings = this.entitiesService.GetSettings(this.entityType);
    const sqlQuery = this.getSelectByIdQuery(
      entitySettings.tableName,
      entitySettings.columns
    );
    const parameters = this.getPrimaryKeyParameter(entitySettings.columns);
    return { query: sqlQuery, parameters };
  }

  private getSelectByIdQuery(
    entityName: string,
    columns: SqlColumnSettings[]
  ): string {
    const primaryKey = columns.find((c) => c.isPrimaryKey);
    if (!primaryKey) throw new Error("No primary key found for SELECT BY ID.");

    const columnNames = columns.map((c) => c.name).join(", ");
    return `SELECT ${columnNames} FROM ${entityName} WHERE ${primaryKey.name} = ${primaryKey.parameterName};`;
  }

  private getPrimaryKeyParameter(
    columns: SqlColumnSettings[]
  ): { name: string; value: any }[] {
    const primaryKey = columns.find((c) => c.isPrimaryKey);
    if (!primaryKey) throw new Error("No primary key column found.");
    if (!this.idValue) throw new Error("No id value provided.");

    return [
      {
        name: primaryKey.parameterName,
        value: this.idValue,
      },
    ];
  }

  private getFieldParameter(
    columns: SqlColumnSettings[],
    fieldName: string,
    fieldValue: any
  ): { name: string; value: any }[] {
    const column = columns.find(
      (c) => c.domainName.toLowerCase() === fieldName.toLowerCase()
    );
    if (!column) throw new Error(`Column "${fieldName}" not found.`);

    return [
      {
        name: column.parameterName,
        value: fieldValue,
      },
    ];
  }

  private getSelectByFieldCommand(): SqlCommand {
    const entitySettings = this.entitiesService.GetSettings(this.entityType);

    if (!this.fieldName || this.fieldValue === undefined) {
      throw new Error(
        "Field name and value must be provided for SelectByField."
      );
    }

    const sqlQuery = this.getSelectByFieldQuery(
      entitySettings.tableName,
      entitySettings.columns,
      this.fieldName
    );

    const parameters = this.getFieldParameter(
      entitySettings.columns,
      this.fieldName,
      this.fieldValue
    );

    return { query: sqlQuery, parameters };
  }

  private getSelectByFieldQuery(
    entityName: string,
    columns: SqlColumnSettings[],
    fieldName: string
  ): string {
    const column = columns.find(
      (c) => c.domainName.toLowerCase() === fieldName.toLowerCase()
    );
    if (!column) throw new Error(`Column "${fieldName}" not found.`);

    const columnNames = columns.map((c) => c.name).join(", ");
    return `SELECT ${columnNames} FROM ${entityName} WHERE ${column.name} = ${column.parameterName};`;
  }
}
