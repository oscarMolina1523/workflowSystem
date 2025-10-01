import { inject, injectable } from "tsyringe";
import Task from "../../../Domain.Endpoint/entities/task.model";
import { ITaskRepository } from "../../../Domain.Endpoint/interfaces/repositories/taskRepository.interface";
import { ISingletonSqlConnection } from "../../interfaces/database/dbConnection.interface";
import { ISqlCommandOperationBuilder } from "../../interfaces/sqlCommandOperation.interface";
import { EntityType } from "../../utils/entityTypes";
import {
  SqlReadOperation,
  SqlWriteOperation,
} from "../../builders/sqlOperations.enum";

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

    return rows.map(
      (row) =>
        new Task({
          id: row["ID"],
          title: row["TITLE"],
          description: row["DESCRIPTION"],
          status: row["STATUS"],
          areaId: row["AREA_ID"],
          createdBy: row["CREATED_BY"],
          assignedTo: row["ASSIGNED_TO"],
        })
    );
  }

  async getById(id: string): Promise<Task | null> {
    const readCommand = this._operationBuilder
      .Initialize(EntityType.Task)
      .WithOperation(SqlReadOperation.SelectById)
      .WithId(id)
      .BuildReader();

    const row = await this._connection.executeScalar(readCommand);
    if (!row) return null;

    return new Task({
      id: row["ID"],
      title: row["TITLE"],
      description: row["DESCRIPTION"],
      status: row["STATUS"],
      areaId: row["AREA_ID"],
      createdBy: row["CREATED_BY"],
      assignedTo: row["ASSIGNED_TO"],
    });
  }

  async getByAreaId(areaId: string): Promise<Task[]> {
    const builder = this._operationBuilder!.Initialize(
      EntityType.Task
    ).WithOperation(SqlReadOperation.SelectByField);

    if (!builder.WithField) throw new Error("WithField no implementado");

    const readCommand = builder.WithField("areaId", areaId).BuildReader();

    const rows = await this._connection.executeQuery(readCommand);
    if (!rows || rows.length === 0) return [];

    return rows.map(
      (row) =>
        new Task({
          id: row["ID"],
          title: row["TITLE"],
          description: row["DESCRIPTION"],
          status: row["STATUS"],
          areaId: row["AREA_ID"],
          createdBy: row["CREATED_BY"],
          assignedTo: row["ASSIGNED_TO"],
        })
    );
  }

  async getByStatus(status: string): Promise<Task[]> {
    const builder = this._operationBuilder
      .Initialize(EntityType.Task)
      .WithOperation(SqlReadOperation.SelectByField);

    if (!builder.WithField) throw new Error("WithField no implementado");

    const readCommand = builder.WithField("status", status).BuildReader();
    const rows = await this._connection.executeQuery(readCommand);

    if (!rows || rows.length === 0) return [];

    return rows.map(
      (row) =>
        new Task({
          id: row["ID"],
          title: row["TITLE"],
          description: row["DESCRIPTION"],
          status: row["STATUS"],
          areaId: row["AREA_ID"],
          createdBy: row["CREATED_BY"],
          assignedTo: row["ASSIGNED_TO"],
        })
    );
  }

  async getByUserId(userId: string): Promise<Task[]> {
    const builder = this._operationBuilder
      .Initialize(EntityType.Task)
      .WithOperation(SqlReadOperation.SelectByField);

    console.log("repository", userId)
    if (!builder.WithField) throw new Error("WithField no implementado");

    const readCommand = builder.WithField("assignedTo", userId).BuildReader();

    const rows = await this._connection.executeQuery(readCommand);
    if (!rows || rows.length === 0) return [];

    console.log("rows", rows)
    return rows.map(
      (row) =>
        new Task({
          id: row["ID"],
          title: row["TITLE"],
          description: row["DESCRIPTION"],
          status: row["STATUS"],
          areaId: row["AREA_ID"],
          createdBy: row["CREATED_BY"],
          assignedTo: row["ASSIGNED_TO"],
        })
    );
  }

  async create(task: Task): Promise<void> {
    const writeCommand = this._operationBuilder
      .From(EntityType.Task, task)
      .WithOperation(SqlWriteOperation.Create)
      .BuildWritter();

    await this._connection.executeNonQuery(writeCommand);
  }

  async update(task: Task): Promise<void> {
    const writeCommand = this._operationBuilder
      .From(EntityType.Task, task)
      .WithOperation(SqlWriteOperation.Update)
      .BuildWritter();

    await this._connection.executeNonQuery(writeCommand);
  }

  async delete(task: Task): Promise<void> {
    const writeCommand = this._operationBuilder
      .From(EntityType.Task, task)
      .WithOperation(SqlWriteOperation.Delete)
      .BuildWritter();

    await this._connection.executeNonQuery(writeCommand);
  }
}
