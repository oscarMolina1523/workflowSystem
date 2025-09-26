import express from 'express';
import { container } from 'tsyringe';
import TaskController from '../controllers/task.controller';

const router = express.Router();
const taskController = container.resolve(TaskController);

/**
 * @swagger
 * components:
 *   schemas:
 *     Task:
 *       type: object
 *       required:
 *         - id
 *         - title
 *         - status
 *         - areaId
 *         - createdBy
 *         - assignedTo
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the Task.
 *         title:
 *           type: string
 *           description: The title of the task.
 *         description:
 *           type: string
 *           description: Optional detailed description of the task.
 *         status:
 *           type: string
 *           enum: [PENDING, IN_PROGRESS, COMPLETED, CANCELLED]
 *           description: The current status of the task.
 *         areaId:
 *           type: string
 *           description: The ID of the area this task belongs to.
 *         createdBy:
 *           type: string
 *           description: The ID of the user who created the task.
 *         assignedTo:
 *           type: string
 *           description: The ID of the user the task is assigned to.
 * 
 *     TaskDTO:
 *       type: object
 *       required:
 *         - title
 *         - status
 *         - areaId
 *         - createdBy
 *         - assignedTo
 *       properties:
 *         title:
 *           type: string
 *           description: The title of the task.
 *         description:
 *           type: string
 *           description: Optional detailed description of the task.
 *         status:
 *           type: string
 *           enum: [PENDING, IN_PROGRESS, COMPLETED, CANCELLED]
 *           description: The current status of the task.
 *         areaId:
 *           type: string
 *           description: The ID of the area this task belongs to.
 *         createdBy:
 *           type: string
 *           description: The ID of the user who created the task.
 *         assignedTo:
 *           type: string
 *           description: The ID of the user the task is assigned to.
 */

/**
 * @swagger
 * tags:
 *   - name: Tasks
 *     description: API for managing tasks
 */

/**
 * @swagger
 * /tasks:
 *   get:
 *     summary: Returns a list of all tasks
 *     tags: [Tasks]
 *     responses:
 *       200:
 *         description: The list of tasks
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Task'
 *       500:
 *         description: Server error
 */
router.get("/", taskController.getTasks);

export default router;
