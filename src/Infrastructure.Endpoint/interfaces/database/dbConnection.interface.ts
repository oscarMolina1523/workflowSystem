import { SqlCommand } from "../sqlCommand.interface";

export interface ISingletonSqlConnection {
  openConnection(file?: string): Promise<void>;
  closeConnection(): Promise<void>;
  executeNonQuery(command: SqlCommand): Promise<void>;
  executeQuery(command: SqlCommand): Promise<any[]>;
  executeScalar(command: SqlCommand): Promise<any>;
}