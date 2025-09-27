import express from "express";
import { container } from "tsyringe";
import AreaController from "../controllers/area.controller";

const router = express.Router();
const areaController = container.resolve(AreaController);

/**
 * @swagger
 * components:
 *   schemas:
 *     Area:
 *       type: object
 *       required:
 *         - id
 *         - title
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the Area.
 *         title:
 *           type: string
 *           description: The title/name of the area.
 *         description:
 *           type: string
 *           description: Optional description of the area.
 *
 *     AreaDTO:
 *       type: object
 *       required:
 *         - title
 *       properties:
 *         title:
 *           type: string
 *           description: The title/name of the area.
 *         description:
 *           type: string
 *           description: Optional description of the area.
 */

/**
 * @swagger
 * tags:
 *   - name: Areas
 *     description: API for managing areas
 */

/**
 * @swagger
 * /areas:
 *   get:
 *     summary: Returns a list of all areas
 *     tags: [Areas]
 *     responses:
 *       200:
 *         description: The list of areas
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Area'
 *       500:
 *         description: Server error
 */
router.get("/", areaController.getAreas);

/**
 * @swagger
 * /areas/{id}:
 *   get:
 *     summary: Get an area by ID
 *     tags: [Areas]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Area ID
 *     responses:
 *       200:
 *         description: Area found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Area'
 *       404:
 *         description: Area not found
 *       500:
 *         description: Server error
 */
router.get("/:id", areaController.getAreaById);

/**
 * @swagger
 * /areas:
 *   post:
 *     summary: Create a new area
 *     tags: [Areas]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/AreaDTO'
 *     responses:
 *       201:
 *         description: Area created successfully
 *       400:
 *         description: Missing or invalid fields
 *       500:
 *         description: Failed to add the area
 */
router.post("/", areaController.addArea);

/**
 * @swagger
 * /areas/{id}:
 *   put:
 *     summary: Update an existing area
 *     tags: [Areas]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Area ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/AreaDTO'
 *     responses:
 *       200:
 *         description: Area updated successfully
 *       400:
 *         description: Invalid input or no fields provided
 *       404:
 *         description: Area not found
 *       500:
 *         description: Failed to update area
 */
router.put("/:id", areaController.updateArea);

/**
 * @swagger
 * /areas/{id}:
 *   delete:
 *     summary: Delete an area by ID
 *     tags: [Areas]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Area ID
 *     responses:
 *       200:
 *         description: Area deleted successfully
 *       404:
 *         description: Area not found
 *       500:
 *         description: Failed to delete area
 */
router.delete("/:id", areaController.deleteArea);

export default router;
