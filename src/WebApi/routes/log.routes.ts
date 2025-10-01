import { Router } from "express";
import { container } from "tsyringe";
import LogController from "../controllers/log.controller";

const router = Router();
const logController = container.resolve(LogController);

/**
 * @swagger
 * tags:
 *   name: Logs
 *   description: API para gestionar los logs de acciones (login, registro, etc.)
 */

/**
 * @swagger
 * /logs:
 *   get:
 *     summary: Obtener todos los logs
 *     tags: [Logs]
 *     responses:
 *       200:
 *         description: Lista de todos los logs
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Log'
 */
router.get("/", logController.getLogs);

/**
 * @swagger
 * /logs/area/{id}:
 *   get:
 *     summary: Obtener logs por área
 *     tags: [Logs]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del área
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Lista de logs filtrados por área
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Log'
 *       400:
 *         description: ID de área requerido
 *       404:
 *         description: No se encontraron logs para el área
 */
router.get("/area/:id", logController.getLogByAreaId);

/**
 * @swagger
 * /logs:
 *   post:
 *     summary: Crear un log manual
 *     tags: [Logs]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - userId
 *               - areaId
 *               - action
 *             properties:
 *               userId:
 *                 type: string
 *                 description: ID del usuario que hizo la acción
 *               areaId:
 *                 type: string
 *                 description: ID del área asociada
 *               action:
 *                 type: string
 *                 enum: [LOGIN, REGISTER]
 *                 description: Acción realizada
 *     responses:
 *       201:
 *         description: Log creado exitosamente
 *       400:
 *         description: Campos faltantes
 *       500:
 *         description: Error del servidor
 */
router.post("/", logController.createLog);

export default router;
