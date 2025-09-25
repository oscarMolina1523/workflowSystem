import { SqlCommandOperationBuilder } from './../Infrastructure.Endpoint/builders/sqlCommandOperation.builder';
import 'reflect-metadata';
import { container } from 'tsyringe';
import { ISqlCommandOperationBuilder } from '../Infrastructure.Endpoint/interfaces/sqlCommandOperation.interface';
import { IEntitiesService } from '../Infrastructure.Endpoint/interfaces/entitiesService.interface';
import { EntitiesService } from '../Infrastructure.Endpoint/services/entitiesService';
import { ISingletonSqlConnection } from '../Infrastructure.Endpoint/interfaces/database/dbConnection.interface';
import { SingletonSqlConnection } from '../Infrastructure.Endpoint/database/dbConnection';
import { ITaskRepository } from '../Domain.Endpoint/interfaces/repositories/taskRepository.interface';
import { TaskRepository } from '../Infrastructure.Endpoint/data/repositories/task.repository';
import { ITaskService } from '../Domain.Endpoint/interfaces/services/taskService.interface';
import TaskService from '../Domain.Endpoint/services/task.service';

// Registrar clases concretas
container.registerSingleton<ISingletonSqlConnection>('ISingletonSqlConnection', SingletonSqlConnection);
container.registerSingleton<IEntitiesService>('IEntityService', EntitiesService);
container.register<ISqlCommandOperationBuilder>('IOperationBuilder', { useClass: SqlCommandOperationBuilder });

//task
container.register<ITaskRepository>('ITaskRepository', { useClass: TaskRepository });
container.register<ITaskService>('ITaskService', { useClass: TaskService });