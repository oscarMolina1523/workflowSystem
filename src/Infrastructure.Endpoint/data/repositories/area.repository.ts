import { inject, injectable } from "tsyringe";
import Area from "../../../Domain.Endpoint/entities/area.model";
import { IAreaRepository } from "../../../Domain.Endpoint/interfaces/repositories/areaRepository.interface";
import { ISingletonSqlConnection } from "../../interfaces/database/dbConnection.interface";
import { ISqlCommandOperationBuilder } from "../../interfaces/sqlCommandOperation.interface";
import { EntityType } from "../../utils/entityTypes";
import { SqlReadOperation, SqlWriteOperation } from "../../builders/sqlOperations.enum";

@injectable()
export class AreaRepository implements IAreaRepository {
  private readonly _operationBuilder: ISqlCommandOperationBuilder;
  private readonly _connection: ISingletonSqlConnection;

  constructor(
    @inject("IOperationBuilder") operationBuilder: ISqlCommandOperationBuilder,
    @inject("ISingletonSqlConnection") connection: ISingletonSqlConnection
  ) {
    this._operationBuilder = operationBuilder;
    this._connection = connection;
  }

  async getAll(): Promise<Area[]> {
    const readCommand = this._operationBuilder
      .Initialize(EntityType.Area)
      .WithOperation(SqlReadOperation.Select)
      .BuildReader();
    const rows = await this._connection.executeQuery(readCommand);

    return rows.map(
      (row) =>
        new Area({
          id: row["ID"],
          title: row["TITLE"],
          description: row["DESCRIPTION"],
        })
    );
  }

  async getById(id: string): Promise<Area | null> {
    const readCommand = this._operationBuilder
      .Initialize(EntityType.Role)
      .WithOperation(SqlReadOperation.SelectById)
      .WithId(id)
      .BuildReader();

    const row = await this._connection.executeScalar(readCommand);
    if (!row) return null;

    return new Area({
      id: row["ID"],
      title: row["TITLE"],
      description: row["DESCRIPTION"],
    });
  }

  async create(role: Area): Promise<void> {
    const writeCommand = this._operationBuilder
      .From(EntityType.Role, role)
      .WithOperation(SqlWriteOperation.Create)
      .BuildWritter();

    await this._connection.executeNonQuery(writeCommand);
  }

  async update(role: Area): Promise<void> {
    const writeCommand = this._operationBuilder
      .From(EntityType.Role, role)
      .WithOperation(SqlWriteOperation.Update)
      .BuildWritter();

    await this._connection.executeNonQuery(writeCommand);
  }

  async delete(role: Area): Promise<void> {
    const writeCommand = this._operationBuilder
      .From(EntityType.Role, role)
      .WithOperation(SqlWriteOperation.Delete)
      .BuildWritter();
      
    await this._connection.executeNonQuery(writeCommand);
  }
}
