import BaseModel from "./base.model";

export default class Role extends BaseModel {
  name: string; // ADMIN, MANAGER, DEVELOPER, VIEWER
  description: string;

  constructor(id: string, name: string, description: string) {
    super(id);
    this.name = name;
    this.description = description;
  }
}
