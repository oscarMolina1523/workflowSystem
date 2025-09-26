import { inject, injectable } from "tsyringe";
import { ITaskService } from "../../Domain.Endpoint/interfaces/services/taskService.interface";
import { Request, Response } from "express";

@injectable()
export default class TaskController {
  private readonly service: ITaskService;
  constructor(@inject("ITaskService") service: ITaskService) {
    this.service = service;
  }

  getTasks = async (req: Request, res: Response) => {
    try {
      const chickens = await this.service.getTasks();
      res.status(200).json({ success: true, data: chickens });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Failed to get tasks" });
    }
  };
}
