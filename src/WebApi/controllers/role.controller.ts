import { inject, injectable } from "tsyringe";
import { IRoleService } from "../../Domain.Endpoint/interfaces/services/roleService.interface";
import { Request, Response } from "express";

@injectable()
export default class RoleController {
  private readonly service: IRoleService;

  constructor(@inject("IRoleService") service: IRoleService) {
    this.service = service;
  }

  getRoles = async (req: Request, res: Response) => {
    try {
      const tasks = await this.service.getRoles();
      res.status(200).json({ success: true, data: tasks });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Failed to get roles" });
    }
  };
}
