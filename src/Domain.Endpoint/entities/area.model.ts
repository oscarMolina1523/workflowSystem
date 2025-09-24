import BaseModel from "./base.model";

export default class Area extends BaseModel {
  title: string;
  description: string;

  constructor(id: string, title: string, description: string) {
    super(id);
    this.title = title;
    this.description = description;
  }
}
