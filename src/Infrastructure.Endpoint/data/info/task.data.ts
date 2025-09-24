import { Status } from "../../../Domain.Endpoint/entities/status.enum";
import Task from "../../../Domain.Endpoint/entities/task.model";

export const seedTasks: Task[] = [
  {
    id: "1",
    title: "Configurar proyecto",
    description: "Inicializar configuración base de Express + TS",
    status: Status.PENDING,
    areaId: "1",
    createdBy: "admin",
    assignedTo: "developer",
  },
  {
    id: "2",
    title: "Diseñar modelo de datos",
    description: "Definir tablas y relaciones para SQLite",
    status: Status.IN_PROGRESS,
    areaId: "2",
    createdBy: "admin",
    assignedTo: "qa",
  },
];
