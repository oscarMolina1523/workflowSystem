import { Status } from "../../../Domain.Endpoint/entities/status.enum";
import Task from "../../../Domain.Endpoint/entities/task.model";

export const seedTasks: Task[] = [
  {
    id: "b90a4c28-568b-4dvs13-a4f6-82087a13c9e6",
    title: "Configurar proyecto",
    description: "Inicializar configuración base de Express + TS",
    status: Status.PENDING,
    areaId: "b90a4c28-568b-4b13-a4f6-82087a13c9e6",
    createdBy: "admin",
    assignedTo: "developer",
  },
  {
    id: "b90a4c28-568b-4b13-a4f6-82087a13c9ava",
    title: "Diseñar modelo de datos",
    description: "Definir tablas y relaciones para SQLite",
    status: Status.IN_PROGRESS,
    areaId: "8a1b6a7e-4d5c-4f1a-9f23-3a8c5e6b7d41",
    createdBy: "admin",
    assignedTo: "qa",
  },
];
