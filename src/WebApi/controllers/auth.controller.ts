import { Request, Response } from "express";
import { inject, injectable } from "tsyringe";
import bcrypt from "bcryptjs";
import { IUserService } from "../../Domain.Endpoint/interfaces/services/userService.interfaz";
import { PublicUser } from "../../Domain.Endpoint/dtos/user.dto";
import { generateAccesToken } from "../utils/jwtUtils";

const DEFAULT_ROLE_ID = "d9e8f7g6-5h4i-3j2k-1l0m-9n8o7p6q5r4s"; // Viewer

@injectable()
export default class AuthController {
  private readonly _userService: IUserService;

  constructor(@inject("IUserService") userService: IUserService) {
    this._userService = userService;
  }

  // 🔹 Registro
  register = async (req: Request, res: Response): Promise<void> => {
    try {
      const { name, email, password, areaId } = req.body;

      if (!name || !email || !password || !areaId) {
        res.status(400).json({ message: "Todos los campos son obligatorios" });
        return;
      }

      const existingUser = await this._userService.getByEmail(email);
      if (existingUser) {
        res.status(400).json({ message: "El correo ya está registrado" });
        return;
      }

      // Hash password
      const hashedPassword = await bcrypt.hash(password, 10);

      const newUser = await this._userService.addUser({
        name,
        email,
        password: hashedPassword,
        areaId,
        roleId: DEFAULT_ROLE_ID,
      });

      // Crear payload "público" (sin password)
      const publicUser: PublicUser = {
        name: newUser.data!.name,
        email: newUser.data!.email,
        roleId: newUser.data!.roleId,
        areaId: newUser.data!.areaId,
        id: newUser.data!.id,
      };

      // Generar token
      const token = generateAccesToken(publicUser);

      res.status(201).json({
        message: "Usuario registrado exitosamente",
        user: publicUser,
        token,
      });
    } catch (error) {
      res.status(500).json({ message: "Error al registrar usuario", error });
    }
  };

  // 🔹 Login
  login = async (req: Request, res: Response): Promise<void> => {
    try {
      const { email, password, areaId } = req.body;

      if (!email || !password || !areaId) {
        res.status(400).json({ message: "Todos los campos son obligatorios" });
        return;
      }

      const user = await this._userService.getByEmail(email);
      if (!user) {
        res.status(401).json({ message: "Credenciales inválidas" });
        return;
      }

      const validPassword = await bcrypt.compare(password, user.password);
      if (!validPassword) {
        res.status(401).json({ message: "Credenciales inválidas" });
        return;
      }

      if (user.areaId !== areaId) {
        res
          .status(403)
          .json({ message: "El usuario no pertenece a esta área" });
        return;
      }

      const publicUser: PublicUser = {
        id: user.id,
        name: user.name,
        email: user.email,
        roleId: user.roleId,
        areaId: user.areaId,
      };

      const token = generateAccesToken(publicUser);

      res.json({
        message: "Login exitoso",
        user: publicUser,
        token,
      });
    } catch (error) {
      res.status(500).json({ message: "Error al iniciar sesión", error });
    }
  };

  // 🔹 Logout (solo frontend debe borrar token)
  logout = async (_req: Request, res: Response): Promise<void> => {
    res.json({ message: "Logout exitoso (elimine el token en el cliente)" });
  };
}
