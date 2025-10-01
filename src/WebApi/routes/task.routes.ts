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

/**
 * @swagger
 * /tasks/area:
 *   get:
 *     summary: Get all tasks for the authenticated user's area
 *     description: Returns a list of tasks filtered by the user's `areaId` extracted from the JWT token.
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of tasks belonging to the user's area
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Task'
 *       401:
 *         description: Unauthorized - missing or invalid token
 *       500:
 *         description: Server error
 */
router.get("/area", taskController.getTasksByAreaId);

/**
 * @swagger
 * /tasks/pending-validation:
 *   get:
 *     summary: Get all tasks pending validation (Admin only)
 *     description: Returns a list of tasks that are waiting for admin validation (status = PENDING_VALIDATION).
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of tasks pending validation
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Task'
 *       401:
 *         description: Unauthorized - missing or invalid token
 *       403:
 *         description: Forbidden - only admins can access
 *       500:
 *         description: Server error
 */
router.get(
  "/pending-validation",
  taskController.getTasksPendingValidation
);

/**
 * @swagger
 * /tasks/user:
 *   get:
 *     summary: Get all tasks assigned to the authenticated user
 *     description: Returns a list of tasks filtered by the `userId` decoded from the JWT token.
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of tasks assigned to the user
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Task'
 *       401:
 *         description: Unauthorized - missing or invalid token
 *       500:
 *         description: Server error
 */
router.get("/user", taskController.getTasksByUserId);


/**
 * @swagger
 * /tasks/{id}:
 *   get:
 *     summary: Get a task by ID
 *     tags: [Tasks]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Task ID
 *     responses:
 *       200:
 *         description: Task found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Task'
 *       404:
 *         description: Task not found
 *       500:
 *         description: Server error
 */
router.get("/:id", taskController.getTaskById);


/**
 * @swagger
 * /tasks:
 *   post:
 *     summary: Create a new task
 *     tags: [Tasks]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/TaskDTO'
 *     responses:
 *       201:
 *         description: Task created successfully
 *       400:
 *         description: Missing or invalid fields
 *       500:
 *         description: Failed to add the task
 */
router.post("/", taskController.addTask);

/**
 * @swagger
 * /tasks/{id}:
 *   put:
 *     summary: Update an existing task
 *     tags: [Tasks]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Task ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/TaskDTO'
 *     responses:
 *       200:
 *         description: Task updated successfully
 *       400:
 *         description: Invalid input or no fields provided
 *       404:
 *         description: Task not found
 *       500:
 *         description: Failed to update task
 */
router.put("/:id", taskController.updateTask);

/**
 * @swagger
 * /tasks/{id}:
 *   delete:
 *     summary: Delete a task by ID
 *     tags: [Tasks]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Task ID
 *     responses:
 *       200:
 *         description: Task deleted successfully
 *       404:
 *         description: Task not found
 *       500:
 *         description: Failed to delete task
 */
router.delete("/:id", taskController.deleteTask);

export default router;
