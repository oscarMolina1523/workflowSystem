import sqlite3 from "sqlite3";
import { open, Database } from "sqlite";
import { SqlCommand } from "../interfaces/sqlCommand.interface";
import { injectable } from "tsyringe";
import path from "path";
import { ISingletonSqlConnection } from "../interfaces/database/dbConnection.interface";

@injectable()
export class SingletonSqlConnection implements ISingletonSqlConnection {
  private static instance: SingletonSqlConnection;
  private db!: Database;

  public constructor(){};

  public static getInstance(): SingletonSqlConnection {
    if (!SingletonSqlConnection.instance) {
      SingletonSqlConnection.instance = new SingletonSqlConnection();
    }
    return SingletonSqlConnection.instance;
  }

  async openConnection(file: string = path.join(__dirname, "..", "..","..", "app.db")): Promise<void> {
    if (!this.db) {
      this.db = await open({
        filename: file,
        driver: sqlite3.Database,
      });
      console.log("Conexión SQLite abierta");
    }
  }

  async closeConnection(): Promise<void> {
    if (this.db) {
      await this.db.close();
      this.db = undefined as any;
      console.log("Conexión SQLite cerrada");
    }
  }

  async executeNonQuery(command: SqlCommand): Promise<void> {
     try {
      await this.openConnection();
      const params = this.mapParameters(command.parameters);
      await this.db.run(command.query, params);
    } finally {
      await this.closeConnection();
    }
  }

  async executeQuery(command: SqlCommand): Promise<any[]> {
    try {
      await this.openConnection();
      const params = this.mapParameters(command.parameters);
      return await this.db.all(command.query, params);
    } finally {
      await this.closeConnection();
    }
  }

  async executeScalar(command: SqlCommand): Promise<any> {
    try {
      await this.openConnection();
      const params = this.mapParameters(command.parameters);
      return await this.db.get(command.query, params);
    } finally {
      await this.closeConnection();
    }
  }

  private mapParameters(parameters: { name: string; value: any }[]) {
    const mapped: any = {};
    for (const p of parameters) {
      mapped[p.name] = p.value;
    }
    return mapped;
  }
}