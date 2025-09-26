import { inject, injectable } from "tsyringe";
import Role from "../../../Domain.Endpoint/entities/role.model";
import { IRoleRepository } from "../../../Domain.Endpoint/interfaces/repositories/roleRepository.interface";
import { ISqlCommandOperationBuilder } from "../../interfaces/sqlCommandOperation.interface";
import { ISingletonSqlConnection } from "../../interfaces/database/dbConnection.interface";
import { EntityType } from "../../utils/entityTypes";
import {
  SqlReadOperation,
  SqlWriteOperation,
} from "../../builders/sqlOperations.enum";

@injectable()
export default class RoleRepository implements IRoleRepository {
  private readonly _operationBuilder: ISqlCommandOperationBuilder;
  private readonly _connection: ISingletonSqlConnection;

  constructor(
    @inject("IOperationBuilder") operationBuilder: ISqlCommandOperationBuilder,
    @inject("ISingletonSqlConnection") connection: ISingletonSqlConnection
  ) {
    this._operationBuilder = operationBuilder;
    this._connection = connection;
  }

  async getAll(): Promise<Role[]> {
    const readCommand = this._operationBuilder
      .Initialize(EntityType.Role)
      .WithOperation(SqlReadOperation.Select)
      .BuildReader();
    const rows = await this._connection.executeQuery(readCommand);

    return rows.map(
      (row) =>
        new Role({
          id: row["ID"],
          name: row["NAME"],
          description: row["DESCRIPTION"],
        })
    );
  }

  async getById(id: string): Promise<Role | null> {
    const readCommand = this._operationBuilder
      .Initialize(EntityType.Role)
      .WithOperation(SqlReadOperation.SelectById)
      .WithId(id)
      .BuildReader();

    const row = await this._connection.executeScalar(readCommand);
    if (!row) return null;

    return new Role({
      id: row["ID"],
      name: row["NAME"],
      description: row["DESCRIPTION"],
    });
  }

  async create(role: Role): Promise<void> {
    const writeCommand = this._operationBuilder
      .From(EntityType.Role, role)
      .WithOperation(SqlWriteOperation.Create)
      .BuildWritter();

    await this._connection.executeNonQuery(writeCommand);
  }

  async update(role: Role): Promise<void> {
    const writeCommand = this._operationBuilder
      .From(EntityType.Role, role)
      .WithOperation(SqlWriteOperation.Update)
      .BuildWritter();

    await this._connection.executeNonQuery(writeCommand);
  }

  async delete(role: Role): Promise<void> {
    const writeCommand = this._operationBuilder
      .From(EntityType.Role, role)
      .WithOperation(SqlWriteOperation.Delete)
      .BuildWritter();
      
    await this._connection.executeNonQuery(writeCommand);
  }
}
