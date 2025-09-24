import Task from "../../../Domain.Endpoint/entities/task.model";
import { ITaskRepository } from "../../../Domain.Endpoint/interfaces/repositories/task.interface";

export class TaskRepository implements ITaskRepository {
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