import { TaskDTO } from "../../dtos/task.dto";
import Task from "../../entities/task.model";
import { ServiceResult } from "../../utils/serviceResult.type";


export interface ITaskService {
  getChickens(): Promise<Task[]>;
  getById(id: string): Promise<Task | null>;
  addChicken(chicken: TaskDTO): Promise<ServiceResult<Task>>;
  updateChicken(id: string, chicken: TaskDTO): Promise<ServiceResult<Task | null>>;
  deleteChicken(id: string): Promise<{ success: boolean; message: string }>;
}