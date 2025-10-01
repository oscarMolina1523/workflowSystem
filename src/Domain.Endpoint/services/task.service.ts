import { inject, injectable } from "tsyringe";
import { TaskDTO } from "../dtos/task.dto";
import Task from "../entities/task.model";
import { ITaskRepository } from "../interfaces/repositories/taskRepository.interface";
import { ITaskService } from "../interfaces/services/taskService.interface";
import { ServiceResult } from "../utils/serviceResult.type";
import { generateId } from "../utils/generateId";
import { Status } from "../entities/status.enum";

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

  async getTaskByArea(areaId: string): Promise<Task[] | null> {
    return await this._taskRepository.getByAreaId(areaId);
  }

  async getTasksPendingValidation(currentUser: {
    role: string;
  }): Promise<Task[]> {
    //este es el id de admin en los roles
    if (currentUser.role !== "2d5c7f8e-1b3a-4c9d-8f0a-7e6b5a4d3c2b") {
      throw new Error(
        "Access denied. Only admin can view tasks pending validation."
      );
    }

    return await this._taskRepository.getByStatus("pending_validation");
  }

  async getTasksByUserId(userId: string): Promise<Task[] | null> {
    return await this._taskRepository.getByUserId(userId);
  }

  async addTask(task: TaskDTO): Promise<ServiceResult<Task>> {
    const id = generateId();
    const newTask = new Task({ id: id, ...task });
    await this._taskRepository.create(newTask);

    return { success: true, message: "Task created", data: newTask };
  }

  async updateTask(
    id: string,
    task: TaskDTO,
    currentUser: { role: string }
  ): Promise<ServiceResult<Task | null>> {
    const existing = await this._taskRepository.getById(id);
    if (!existing) {
      return { success: false, message: "Task not found", data: null };
    }
    //este es el id de admin en los roles
    if (
      currentUser.role !== "2d5c7f8e-1b3a-4c9d-8f0a-7e6b5a4d3c2b" &&
      task.status === Status.DONE
    ) {
      existing.status = Status.PENDING_VALIDATION;
    } else {
      // actualizar solo las propiedades necesarias
      Object.assign(existing, task);
    }
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
