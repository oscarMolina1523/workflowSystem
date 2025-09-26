import { inject, injectable } from "tsyringe";
import { TaskDTO } from "../dtos/task.dto";
import Task from "../entities/task.model";
import { ITaskRepository } from "../interfaces/repositories/taskRepository.interface";
import { ITaskService } from "../interfaces/services/taskService.interface";
import { ServiceResult } from "../utils/serviceResult.type";
import { generateId } from "../utils/generateId";

@injectable()
export default class TaskService implements ITaskService {
  private readonly _taskRepository: ITaskRepository;

  constructor(@inject("ITaskRepository") taskRepository: ITaskRepository) {
    this._taskRepository = taskRepository;
  }

  async getTasks(): Promise<Task[]> {
    return await this._taskRepository.getAll();
  }

  async getById(id: string): Promise<Task | null> {
    return await this._taskRepository.getById(id);
  }

  async addTask(task: TaskDTO): Promise<ServiceResult<Task>> {
    const id = generateId();
    const newTask = new Task({id: id, ...task});
    await this._taskRepository.create(newTask);

    return { success: true, message: "Task created", data: newTask };
  }

  async updateTask(
    id: string,
    task: TaskDTO
  ): Promise<ServiceResult<Task | null>> {
    const existing = await this._taskRepository.getById(id);
    if (!existing) {
      return { success: false, message: "Task not found", data: null };
    }

    // actualizar solo las propiedades necesarias
    Object.assign(existing, task);
    await this._taskRepository.update(existing);

    return { success: true, message: "Task updated", data: existing };
  }

  async deleteTask(id: string): Promise<{ success: boolean; message: string }> {
    const existing = await this._taskRepository.getById(id);
    if (!existing) {
      return { success: false, message: "Task not found" };
    }

    await this._taskRepository.delete(existing);
    return { success: true, message: "Task deleted" };
  }
}
