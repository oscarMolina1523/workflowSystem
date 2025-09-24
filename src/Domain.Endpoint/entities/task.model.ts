import BaseModel from "./base.model"
import { Status } from "./status.enum";

export default class Task extends BaseModel{
    title:string;
    description:string
    status: Status;
    areaId:string;
    createdBy:string;
    assignedTo:string;

    constructor(id:string, title:string, description:string, status:Status, areaId:string, createdBy:string, assignedTo:string){
        super(id);
        this.title=title;
        this.description=description;
        this.status=status;
        this.areaId=areaId;
        this.createdBy=createdBy;
        this.assignedTo=assignedTo;
    }
}