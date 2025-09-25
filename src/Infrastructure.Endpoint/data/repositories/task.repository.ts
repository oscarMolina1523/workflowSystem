import { inject, injectable } from "tsyringe";
import Task from "../../../Domain.Endpoint/entities/task.model";
import { ITaskRepository } from "../../../Domain.Endpoint/interfaces/repositories/task.interface";
import { ISingletonSqlConnection } from "../../interfaces/database/dbConnection.interface";
import { ISqlCommandOperationBuilder } from "../../interfaces/sqlCommandOperation.interface";

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

  getAll(): Promise<Task[]> {
    throw new Error("Method not implemented.");
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
