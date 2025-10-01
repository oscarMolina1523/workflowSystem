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

export default router;
