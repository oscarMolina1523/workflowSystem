import { inject, injectable } from "tsyringe";
import { User } from "../../../Domain.Endpoint/entities/user.model";
import { IUserRepository } from "../../../Domain.Endpoint/interfaces/repositories/userRepository.interface";
import { ISqlCommandOperationBuilder } from "../../interfaces/sqlCommandOperation.interface";
import { ISingletonSqlConnection } from "../../interfaces/database/dbConnection.interface";
import { EntityType } from "../../utils/entityTypes";
import { SqlReadOperation, SqlWriteOperation } from "../../builders/sqlOperations.enum";

@injectable()
export class UserRepository implements IUserRepository {
  private readonly _operationBuilder: ISqlCommandOperationBuilder;
  private readonly _connection: ISingletonSqlConnection;

  constructor(
    @inject("IOperationBuilder") operationBuilder: ISqlCommandOperationBuilder,
    @inject("ISingletonSqlConnection") connection: ISingletonSqlConnection
  ) {
    this._operationBuilder = operationBuilder;
    this._connection = connection;
  }

  async getAll(): Promise<User[]> {
    const readCommand = this._operationBuilder
      .Initialize(EntityType.User)
      .WithOperation(SqlReadOperation.Select)
      .BuildReader();
    const rows = await this._connection.executeQuery(readCommand);

    return rows.map(
      (row) =>
        new User({
          id: row["ID"],
          name: row["NAME"],
          email: row["EMAIL"],
          password: row["PASSWORD"],
          areaId: row["AREA_ID"],
          roleId: row["ROLE_ID"],
        })
    );
  }

  async getById(id: string): Promise<User | null> {
    const readCommand = this._operationBuilder
      .Initialize(EntityType.User)
      .WithOperation(SqlReadOperation.SelectById)
      .WithId(id)
      .BuildReader();

    const row = await this._connection.executeScalar(readCommand);
    if (!row) return null;

    return new User({
      id: row["ID"],
      name: row["NAME"],
      email: row["EMAIL"],
      password: row["PASSWORD"],
      areaId: row["AREA_ID"],
      roleId: row["ROLE_ID"],
    });
  }

  getByEmail(id: string): Promise<User | null> {
    throw new Error("Method not implemented.");
  }

  async create(user: User): Promise<void> {
    const writeCommand = this._operationBuilder
      .From(EntityType.User, user)
      .WithOperation(SqlWriteOperation.Create)
      .BuildWritter();

    await this._connection.executeNonQuery(writeCommand);
  }

  async update(user: User): Promise<void> {
    const writeCommand = this._operationBuilder
      .From(EntityType.User, user)
      .WithOperation(SqlWriteOperation.Update)
      .BuildWritter();

    await this._connection.executeNonQuery(writeCommand);
  }

  async delete(user: User): Promise<void> {
    const writeCommand = this._operationBuilder
      .From(EntityType.User, user)
      .WithOperation(SqlWriteOperation.Delete)
      .BuildWritter();
      
    await this._connection.executeNonQuery(writeCommand);
  }
}
