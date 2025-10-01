import { inject, injectable } from "tsyringe";
import LogModel from "../../../Domain.Endpoint/entities/log.model";
import { ILogRepository } from "../../../Domain.Endpoint/interfaces/repositories/logRepository.interface";
import { ISqlCommandOperationBuilder } from "../../interfaces/sqlCommandOperation.interface";
import { ISingletonSqlConnection } from "../../interfaces/database/dbConnection.interface";
import { EntityType } from "../../utils/entityTypes";
import { SqlReadOperation, SqlWriteOperation } from "../../builders/sqlOperations.enum";

@injectable()
export default class LogRepository implements ILogRepository {
  private readonly _operationBuilder: ISqlCommandOperationBuilder;
  private readonly _connection: ISingletonSqlConnection;

  constructor(
    @inject("IOperationBuilder") operationBuilder: ISqlCommandOperationBuilder,
    @inject("ISingletonSqlConnection") connection: ISingletonSqlConnection
  ) {
    this._operationBuilder = operationBuilder;
    this._connection = connection;
  }

  async getAll(): Promise<LogModel[]> {
    const readCommand = this._operationBuilder
      .Initialize(EntityType.Log)
      .WithOperation(SqlReadOperation.Select)
      .BuildReader();
    const rows = await this._connection.executeQuery(readCommand);

    return rows.map(
      (row) =>
        new LogModel({
          id: row["ID"],
          userId: row["USER_ID"],
          action: row["ACTION"],
          areaId: row["AREA_ID"],
          timestamp: row["TIMESTAMP"],
        })
    );
  }

  async getByArea(areaId: string): Promise<LogModel[]> {
    const builder = this._operationBuilder!.Initialize(
      EntityType.Log
    ).WithOperation(SqlReadOperation.SelectByField);

    if (!builder.WithField) throw new Error("WithField no implementado");

    const readCommand = builder.WithField("areaId", areaId).BuildReader();

    const rows = await this._connection.executeQuery(readCommand);
    if (!rows || rows.length === 0) return [];

    return rows.map(
      (row) =>
        new LogModel({
          id: row["ID"],
          userId: row["USER_ID"],
          action: row["ACTION"],
          areaId: row["AREA_ID"],
          timestamp: row["TIMESTAMP"],
        })
    );
  }

  async create(log: LogModel): Promise<void> {
    const writeCommand = this._operationBuilder
      .From(EntityType.Log, log)
      .WithOperation(SqlWriteOperation.Create)
      .BuildWritter();

    await this._connection.executeNonQuery(writeCommand);
  }
}
