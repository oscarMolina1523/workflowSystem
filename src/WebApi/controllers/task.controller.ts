import { inject, injectable } from "tsyringe";
import { ITaskService } from "../../Domain.Endpoint/interfaces/services/taskService.interface";
import { Request, Response } from "express";
import { TaskDTO } from "../../Domain.Endpoint/dtos/task.dto";

@injectable()
export default class TaskController {
  private readonly service: ITaskService;
  constructor(@inject("ITaskService") service: ITaskService) {
    this.service = service;
  }

  getTasks = async (req: Request, res: Response) => {
    try {
      const tasks = await this.service.getTasks();
      res.status(200).json({ success: true, data: tasks });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Failed to get tasks" });
    }
  };

  getTaskById = async (req: Request, res: Response) => {
    const taskId: string | undefined = req.params.id;

    if (!taskId) {
      return res.status(400).json({ message: "Task ID is required." });
    }

    try {
      const task = await this.service.getById(taskId);

      if (task) {
        res.status(200).json({ success: true, data: task });
      } else {
        res.status(404).json({ message: "task not found" });
      }
    } catch {
      res.status(500).json({ message: "Failed to get task" });
    }
  };

  addTask = async (req: Request, res: Response) => {
    const taskDto: TaskDTO = req.body;

    if (
      !taskDto.areaId ||
      !taskDto.assignedTo ||
      !taskDto.createdBy ||
      !taskDto.status ||
      !taskDto.title 
    ) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    try {
      const response = await this.service.addTask(taskDto);
      res.status(201).json({
        success: response.success,
        message: response.message,
        status: response.data,
      });
    } catch {
      res.status(400).json({ message: "Failed to add the task" });
    }
  };
}
