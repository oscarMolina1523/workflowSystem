import { inject, injectable } from "tsyringe";
import { IRoleService } from "../../Domain.Endpoint/interfaces/services/roleService.interface";
import { Request, Response } from "express";
import { RoleDTO } from "../../Domain.Endpoint/dtos/role.dto";

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

  getRoleById = async (req: Request, res: Response) => {
    const roleId: string | undefined = req.params.id;

    if (!roleId) {
      return res.status(400).json({ message: "Role ID is required." });
    }

    try {
      const task = await this.service.getById(roleId);

      if (task) {
        res.status(200).json({ success: true, data: task });
      } else {
        res.status(404).json({ message: "role not found" });
      }
    } catch {
      res.status(500).json({ message: "Failed to get role" });
    }
  };

  addRole = async (req: Request, res: Response) => {
    const roleDto: RoleDTO = req.body;

    if (
      !roleDto.name 
    ) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    try {
      const response = await this.service.addRole(roleDto);
      res.status(201).json({
        success: response.success,
        message: response.message,
        status: response.data,
      });
    } catch {
      res.status(400).json({ message: "Failed to add the role" });
    }
  };
}
