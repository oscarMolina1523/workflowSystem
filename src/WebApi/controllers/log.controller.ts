import { inject, injectable } from "tsyringe";
import { ILogService } from "../../Domain.Endpoint/interfaces/services/logService.interface";
import { Request, Response } from "express";

@injectable()
export default class LogController {
  private readonly service: ILogService;

  constructor(@inject("ILogService") service: ILogService) {
    this.service = service;
  }

  getLogs = async (req: Request, res: Response) => {
    try {
      const logs = await this.service.getLogs();
      res.status(200).json({ success: true, data: logs });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Failed to get logs" });
    }
  };

  getLogByAreaId = async (req: Request, res: Response) => {
    const areaId: string | undefined = req.params.id;

    if (!areaId) {
      return res.status(400).json({ message: "Area ID is required." });
    }

    try {
      const task = await this.service.getByAreaId(areaId);

      if (task) {
        res.status(200).json({ success: true, data: task });
      } else {
        res.status(404).json({ message: "area not found" });
      }
    } catch {
      res.status(500).json({ message: "Failed to get area" });
    }
  };
}
