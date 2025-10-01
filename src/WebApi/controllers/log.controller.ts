import { inject, injectable } from "tsyringe";
import { ILogService } from "../../Domain.Endpoint/interfaces/services/logService.interface";
import { Request, Response } from "express";
import { Log } from "../../Domain.Endpoint/entities/log.enum";

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

   createLog = async (req: Request, res: Response) => {
    const { userId, areaId, action } = req.body;

    if (!userId || !areaId || !action) {
      return res.status(400).json({ message: "userId, areaId y action son requeridos" });
    }

    try {
      const log = await this.service.addLog({
        userId,
        areaId,
        action: action as Log, // Convertimos a enum
      });

      res.status(201).json({
        success: true,
        message: "Log creado exitosamente",
        data: log.data,
      });
    } catch (error) {
      console.error("Error al crear log:", error);
      res.status(500).json({ message: "Error al crear el log", error });
    }
  };
}
