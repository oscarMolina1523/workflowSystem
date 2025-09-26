import express from "express";
import { container } from "tsyringe";
import AuthController from "../controllers/auth.controller";

const router = express.Router();
const authController = container.resolve(AuthController);

/**
 * @swagger
 * components:
 *   schemas:
 *     RegisterDTO:
 *       type: object
 *       required:
 *         - name
 *         - email
 *         - password
 *         - areaId
 *       properties:
 *         name:
 *           type: string
 *           description: Nombre del usuario
 *         email:
 *           type: string
 *           description: Correo electrónico del usuario
 *         password:
 *           type: string
 *           description: Contraseña del usuario (será hasheada)
 *         areaId:
 *           type: string
 *           description: ID del área a la que pertenece el usuario
 *     LoginDTO:
 *       type: object
 *       required:
 *         - email
 *         - password
 *         - areaId
 *       properties:
 *         email:
 *           type: string
 *           description: Correo electrónico del usuario
 *         password:
 *           type: string
 *           description: Contraseña del usuario
 *         areaId:
 *           type: string
 *           description: ID del área en la que desea iniciar sesión
 *     PublicUser:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *         name:
 *           type: string
 *         email:
 *           type: string
 *         roleId:
 *           type: string
 *         areaId:
 *           type: string
 */

/**
 * @swagger
 * tags:
 *   - name: Auth
 *     description: API para autenticación de usuarios
 */

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Registrar un nuevo usuario
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/RegisterDTO'
 *     responses:
 *       201:
 *         description: Usuario registrado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 user:
 *                   $ref: '#/components/schemas/PublicUser'
 *                 token:
 *                   type: string
 *       400:
 *         description: Campos inválidos o usuario ya registrado
 *       500:
 *         description: Error en el servidor
 */
router.post("/register", authController.register);

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Iniciar sesión
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/LoginDTO'
 *     responses:
 *       200:
 *         description: Login exitoso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 user:
 *                   $ref: '#/components/schemas/PublicUser'
 *                 token:
 *                   type: string
 *       401:
 *         description: Credenciales inválidas
 *       403:
 *         description: El usuario no pertenece a esta área
 *       500:
 *         description: Error en el servidor
 */
router.post("/login", authController.login);

/**
 * @swagger
 * /auth/logout:
 *   post:
 *     summary: Cerrar sesión (logout)
 *     tags: [Auth]
 *     responses:
 *       200:
 *         description: Logout exitoso (el cliente debe eliminar el token)
 */
router.post("/logout", authController.logout);

export default router;
