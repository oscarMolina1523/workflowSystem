import { inject, injectable } from "tsyringe";
import { TaskDTO } from "../dtos/task.dto";
import Task from "../entities/task.model";
import { ITaskRepository } from "../interfaces/repositories/taskRepository.interface";
import { ITaskService } from "../interfaces/services/taskService.interface";
import { ServiceResult } from "../utils/serviceResult.type";

@injectable()
export default class TaskService implements ITaskService {
  private readonly _taskRepository: ITaskRepository;

  constructor(@inject("ITaskRepository") taskRepository: ITaskRepository) {
    this._taskRepository = taskRepository;
  }

  async getTasks(): Promise<Task[]> {
    return await this._taskRepository.getAll();
  }

  getById(id: string): Promise<Task | null> {
    throw new Error("Method not implemented.");
  }
  addTask(task: TaskDTO): Promise<ServiceResult<Task>> {
    throw new Error("Method not implemented.");
  }
  updateTask(
    id: string,
    task: TaskDTO
  ): Promise<ServiceResult<Task | null>> {
    throw new Error("Method not implemented.");
  }
  deleteTask(id: string): Promise<{ success: boolean; message: string }> {
    throw new Error("Method not implemented.");
  }
}
