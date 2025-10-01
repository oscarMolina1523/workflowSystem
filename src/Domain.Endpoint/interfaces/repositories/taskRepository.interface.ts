import Task from "../../entities/task.model";

export interface ITaskRepository {
  getAll(): Promise<Task[]>;
  getById(id: string): Promise<Task | null>;
  getByAreaId(areaId: string): Promise<Task[]>;
  getByStatus(status: string): Promise<Task[]>;
  getByUserId(userId: string): Promise<Task[]>
  create(task: Task): Promise<void>;
  update(task: Task): Promise<void>;
  delete(task: Task): Promise<void>;
}