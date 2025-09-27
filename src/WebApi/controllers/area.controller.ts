import { inject, injectable } from "tsyringe";
import { IAreaService } from "../../Domain.Endpoint/interfaces/services/areaService.interface";
import { Request, Response } from "express";
import { AreaDTO } from "../../Domain.Endpoint/dtos/area.dto";

@injectable()
export default class AreaController {
  private readonly service: IAreaService;

  constructor(@inject("IAreaService") service: IAreaService) {
    this.service = service;
  }

  getAreas = async (req: Request, res: Response) => {
    try {
      const areas = await this.service.getAreas();
      res.status(200).json({ success: true, data: areas });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Failed to get areas" });
    }
  };

  getAreaById = async (req: Request, res: Response) => {
    const areaId: string | undefined = req.params.id;

    if (!areaId) {
      return res.status(400).json({ message: "Area ID is required." });
    }

    try {
      const task = await this.service.getById(areaId);

      if (task) {
        res.status(200).json({ success: true, data: task });
      } else {
        res.status(404).json({ message: "area not found" });
      }
    } catch {
      res.status(500).json({ message: "Failed to get area" });
    }
  };

  addArea = async (req: Request, res: Response) => {
    const areaDto: AreaDTO = req.body;

    if (!areaDto.title) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    try {
      const response = await this.service.addArea(areaDto);
      res.status(201).json({
        success: response.success,
        message: response.message,
        status: response.data,
      });
    } catch {
      res.status(400).json({ message: "Failed to add the area" });
    }
  };

  updateArea = async (req: Request, res: Response) => {
    const id: string | undefined = req.params.id;
    const updatedData: AreaDTO = req.body;

    if (!id) {
      return res.status(400).json({ message: "Area ID is required." });
    }
    //este es para testear que haya al menos un campo a actualizar
    if (Object.keys(updatedData).length === 0) {
      return res
        .status(400)
        .json({ message: "No fields provided for update." });
    }

    try {
      const success = await this.service.updateArea(id, updatedData);

      if (success) {
        res.status(200).json({
          success: success.success,
          data: success.data,
          message: success.message,
        });
      } else {
        res.status(404).json({ message: "Area not found" });
      }
    } catch {
      res.status(400).json({ message: "Failed to update area" });
    }
  };

  deleteArea = async (req: Request, res: Response) => {
    const id: string | undefined = req.params.id;
    if (!id) {
      return res.status(400).json({ message: "Area ID is required." });
    }

    try {
      const result = await this.service.deleteArea(id);

      if (result) {
        res.status(200).json({
          success: result.success,
          message: "Area deleted successfully",
        });
      } else {
        res.status(404).json({ message: "Area not found" });
      }
    } catch {
      res.status(400).json({ message: "Failed to delete area" });
    }
  };
}
