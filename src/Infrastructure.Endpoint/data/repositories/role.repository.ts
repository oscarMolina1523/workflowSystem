import { inject, injectable } from "tsyringe";
import Role from "../../../Domain.Endpoint/entities/role.model";
import { IRoleRepository } from "../../../Domain.Endpoint/interfaces/repositories/roleRepository.interface";
import { ISqlCommandOperationBuilder } from "../../interfaces/sqlCommandOperation.interface";
import { ISingletonSqlConnection } from "../../interfaces/database/dbConnection.interface";
import { EntityType } from "../../utils/entityTypes";
import { SqlReadOperation } from "../../builders/sqlOperations.enum";

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
    
        return rows.map(row => new Role({
          id: row["ID"], 
          name: row["NAME"],
          description: row["DESCRIPTION"],
        }));
  }
  
  getById(id: string): Promise<Role | null> {
    throw new Error("Method not implemented.");
  }
  create(role: Role): Promise<void> {
    throw new Error("Method not implemented.");
  }
  update(role: Role): Promise<void> {
    throw new Error("Method not implemented.");
  }
  delete(role: Role): Promise<void> {
    throw new Error("Method not implemented.");
  }
}
