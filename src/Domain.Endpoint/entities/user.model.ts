import BaseModel from "./base.model";

export class User extends BaseModel {
  name: string;
  email: string;
  password: string;
  area: string;

  constructor(
    id: string,
    name: string,
    email: string,
    password: string,
    area: string
  ) {
    super(id);
    this.name = name;
    this.email = email;
    this.password = password;
    this.area = area;
  }
}
