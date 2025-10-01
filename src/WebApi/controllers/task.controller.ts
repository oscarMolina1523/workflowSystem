import { inject, injectable } from "tsyringe";
import { ITaskService } from "../../Domain.Endpoint/interfaces/services/taskService.interface";
import { Request, Response } from "express";
import { TaskDTO } from "../../Domain.Endpoint/dtos/task.dto";
import { decodeToken } from "../utils/jwtUtils";

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

  getTasksByAreaId = async (req: Request, res: Response) => {
    const user = decodeToken(req);
    console.log("Decoded user from token:", user);

    try {
      const tasks = await this.service.getTaskByArea(user.areaId);
      res.status(200).json({ success: true, data: tasks });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Failed to get tasks by area" });
    }
  };

  getTasksPendingValidation = async (req: Request, res: Response) => {
    const user = decodeToken(req);

    try {
      const tasks = await this.service.getTasksPendingValidation({ role: user.roleId });
      res.status(200).json({ success: true, data: tasks });
    } catch (error: any) {
      console.error(error);
      res.status(403).json({ message: error.message || "Not authorized" });
    }
  };

  getTasksByUserId = async (req: Request, res: Response) => {
    const user = decodeToken(req);
    console.log("Decoded user from token:", user);

    try {
      const tasks = await this.service.getTaskByArea(user.id);
      res.status(200).json({ success: true, data: tasks });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Failed to get tasks by area" });
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

  updateTask = async (req: Request, res: Response) => {
    const id: string | undefined = req.params.id;
    const updatedData: TaskDTO = req.body;
    const user = decodeToken(req);

    if (!id) {
      return res.status(400).json({ message: "TASK ID is required." });
    }
    //este es para testear que haya al menos un campo a actualizar
    if (Object.keys(updatedData).length === 0) {
      return res
        .status(400)
        .json({ message: "No fields provided for update." });
    }

    try {
      const success = await this.service.updateTask(id, updatedData, {
        role: user.roleId,
      });

      if (success) {
        res.status(200).json({
          success: success.success,
          data: success.data,
          message: success.message,
        });
      } else {
        res.status(404).json({ message: "Task not found" });
      }
    } catch {
      res.status(400).json({ message: "Failed to update task" });
    }
  };

  deleteTask = async (req: Request, res: Response) => {
    const id: string | undefined = req.params.id;
    if (!id) {
      return res.status(400).json({ message: "Task ID is required." });
    }

    try {
      const result = await this.service.deleteTask(id);

      if (result) {
        res.status(200).json({
          success: result.success,
          message: "Task deleted successfully",
        });
      } else {
        res.status(404).json({ message: "Task not found" });
      }
    } catch {
      res.status(400).json({ message: "Failed to delete task" });
    }
  };
}
