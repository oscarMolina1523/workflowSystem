import { inject, injectable } from "tsyringe";
import Task from "../../../Domain.Endpoint/entities/task.model";
import { ITaskRepository } from "../../../Domain.Endpoint/interfaces/repositories/taskRepository.interface";
import { ISingletonSqlConnection } from "../../interfaces/database/dbConnection.interface";
import { ISqlCommandOperationBuilder } from "../../interfaces/sqlCommandOperation.interface";
import { EntityType } from "../../utils/entityTypes";
import { SqlReadOperation } from "../../builders/sqlOperations.enum";

@injectable()
export class TaskRepository implements ITaskRepository {
  private readonly _operationBuilder: ISqlCommandOperationBuilder;
  private readonly _connection: ISingletonSqlConnection;

  constructor(
    @inject("IOperationBuilder") operationBuilder: ISqlCommandOperationBuilder,
    @inject("ISingletonSqlConnection") connection: ISingletonSqlConnection
  ) {
    this._operationBuilder = operationBuilder;
    this._connection = connection;
  }

  async getAll(): Promise<Task[]> {
    const readCommand = this._operationBuilder
      .Initialize(EntityType.Task)
      .WithOperation(SqlReadOperation.Select)
      .BuildReader();
     const rows = await this._connection.executeQuery(readCommand);

    return rows.map(row => new Task(
      row["ID"], 
      row["TITLE"],
      row["DESCRIPTION"],
      row["STATUS"],
      row["AREA_ID"],
      row["CREATED_BY"],
      row["ASSIGNED_TO"],
    ));
  }
  getById(id: string): Promise<Task | null> {
    throw new Error("Method not implemented.");
  }
  create(task: Task): Promise<void> {
    throw new Error("Method not implemented.");
  }
  update(task: Task): Promise<void> {
    throw new Error("Method not implemented.");
  }
  delete(task: Task): Promise<void> {
    throw new Error("Method not implemented.");
  }
}
