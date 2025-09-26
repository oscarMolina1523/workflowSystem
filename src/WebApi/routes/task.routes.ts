import express from 'express'
import { container } from 'tsyringe';
import TaskController from '../controllers/task.controller';

const router = express.Router();
const taskController = container.resolve(TaskController);

router.get("/", taskController.getTasks);

export default router;