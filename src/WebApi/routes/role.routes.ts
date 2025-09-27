import express from "express";
import { container } from "tsyringe";
import RoleController from "../controllers/role.controller";

const router = express.Router();
const roleController = container.resolve(RoleController);

/**
 * @swagger
 * components:
 *   schemas:
 *     Role:
 *       type: object
 *       required:
 *         - id
 *         - name
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the Role.
 *         name:
 *           type: string
 *           description: Role name (e.g., ADMIN, MANAGER, DEVELOPER, VIEWER).
 *         description:
 *           type: string
 *           description: Optional description of the role.
 *
 *     RoleDTO:
 *       type: object
 *       required:
 *         - name
 *       properties:
 *         name:
 *           type: string
 *           description: Role name (e.g., ADMIN, MANAGER, DEVELOPER, VIEWER).
 *         description:
 *           type: string
 *           description: Optional description of the role.
 */

/**
 * @swagger
 * tags:
 *   - name: Roles
 *     description: API for managing user roles
 */

/**
 * @swagger
 * /roles:
 *   get:
 *     summary: Returns a list of all roles
 *     tags: [Roles]
 *     responses:
 *       200:
 *         description: The list of roles
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Role'
 *       500:
 *         description: Server error
 */
router.get("/", roleController.getRoles);

/**
 * @swagger
 * /roles/{id}:
 *   get:
 *     summary: Get a role by ID
 *     tags: [Roles]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Role ID
 *     responses:
 *       200:
 *         description: Role found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Role'
 *       404:
 *         description: Role not found
 *       500:
 *         description: Server error
 */
router.get("/:id", roleController.getRoleById);

/**
 * @swagger
 * /roles:
 *   post:
 *     summary: Create a new role
 *     tags: [Roles]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/RoleDTO'
 *     responses:
 *       201:
 *         description: Role created successfully
 *       400:
 *         description: Missing or invalid fields
 *       500:
 *         description: Failed to add the role
 */
router.post("/", roleController.addRole);

/**
 * @swagger
 * /roles/{id}:
 *   put:
 *     summary: Update an existing role
 *     tags: [Roles]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Role ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/RoleDTO'
 *     responses:
 *       200:
 *         description: Role updated successfully
 *       400:
 *         description: Invalid input or no fields provided
 *       404:
 *         description: Role not found
 *       500:
 *         description: Failed to update role
 */
router.put("/:id", roleController.updateRole);

/**
 * @swagger
 * /roles/{id}:
 *   delete:
 *     summary: Delete a role by ID
 *     tags: [Roles]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Role ID
 *     responses:
 *       200:
 *         description: Role deleted successfully
 *       404:
 *         description: Role not found
 *       500:
 *         description: Failed to delete role
 */
router.delete("/:id", roleController.deleteRole);

export default router;
