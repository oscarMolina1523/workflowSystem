import { TaskDTO } from "../../dtos/task.dto";
import Task from "../../entities/task.model";
import { ServiceResult } from "../../utils/serviceResult.type";


export interface ITaskService {
  getTasks(): Promise<Task[]>;
  getById(id: string): Promise<Task | null>;
  getTaskByArea(areaId: string): Promise<Task[] | null>;
  addTask(task: TaskDTO): Promise<ServiceResult<Task>>;
  updateTask(id: string, task: TaskDTO, currentUser: { role: string }): Promise<ServiceResult<Task | null>>;
  deleteTask(id: string): Promise<{ success: boolean; message: string }>;
}