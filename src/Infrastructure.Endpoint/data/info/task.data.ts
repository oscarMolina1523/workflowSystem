import { Status } from "../../../Domain.Endpoint/entities/status.enum";
import Task from "../../../Domain.Endpoint/entities/task.model";

export const seedTasks: Task[] = [
  {
    id: "b90a4c28-568b-4dvs13-a4f6-82087a13c9e6",
    title: "Configurar proyecto",
    description: "Inicializar configuración base de Express + TS",
    status: Status.PENDING,
    areaId: "1",
    createdBy: "admin",
    assignedTo: "developer",
  },
  {
    id: "b90a4c28-568b-4b13-a4f6-82087a13c9ava",
    title: "Diseñar modelo de datos",
    description: "Definir tablas y relaciones para SQLite",
    status: Status.IN_PROGRESS,
    areaId: "2",
    createdBy: "admin",
    assignedTo: "qa",
  },
];
