import { TaskDTO } from "../dtos/task.dto";
import Task from "../entities/task.model";
import { ITaskService } from "../interfaces/services/taskService.interface";
import { ServiceResult } from "../utils/serviceResult.type";

export default class TaskService implements ITaskService {
    getChickens(): Promise<Task[]> {
        throw new Error("Method not implemented.");
    }
    getById(id: string): Promise<Task | null> {
        throw new Error("Method not implemented.");
    }
    addChicken(chicken: TaskDTO): Promise<ServiceResult<Task>> {
        throw new Error("Method not implemented.");
    }
    updateChicken(id: string, chicken: TaskDTO): Promise<ServiceResult<Task | null>> {
        throw new Error("Method not implemented.");
    }
    deleteChicken(id: string): Promise<{ success: boolean; message: string; }> {
        throw new Error("Method not implemented.");
    }

}