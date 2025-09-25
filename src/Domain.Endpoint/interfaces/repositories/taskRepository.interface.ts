import Task from "../../entities/task.model";

export interface ITaskRepository {
  getAll(): Promise<Task[]>;
  getById(id: string): Promise<Task | null>;
  create(task: Task): Promise<void>;
  update(task: Task): Promise<void>;
  delete(task: Task): Promise<void>;
}