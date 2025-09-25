import { Status } from "../entities/status.enum";

export interface TaskDTO{
    title:string;
    status: Status;
    areaId:string;
    createdBy:string;
    assignedTo:string;
    description?:string
}