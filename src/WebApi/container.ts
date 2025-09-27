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
import TaskController from './controllers/task.controller';
import { IUserRepository } from '../Domain.Endpoint/interfaces/repositories/userRepository.interface';
import { UserRepository } from '../Infrastructure.Endpoint/data/repositories/user.repository';
import { IUserService } from '../Domain.Endpoint/interfaces/services/userService.interfaz';
import UserService from '../Domain.Endpoint/services/user.service';
import UserController from './controllers/user.controller';
import AuthController from './controllers/auth.controller';
import { IRoleRepository } from '../Domain.Endpoint/interfaces/repositories/roleRepository.interface';
import RoleRepository from '../Infrastructure.Endpoint/data/repositories/role.repository';
import { IRoleService } from '../Domain.Endpoint/interfaces/services/roleService.interface';
import RoleService from '../Domain.Endpoint/services/role.service';
import RoleController from './controllers/role.controller';
import { IAreaRepository } from '../Domain.Endpoint/interfaces/repositories/areaRepository.interface';
import { AreaRepository } from '../Infrastructure.Endpoint/data/repositories/area.repository';
import { IAreaService } from '../Domain.Endpoint/interfaces/services/areaService.interface';
import { AreaService } from '../Domain.Endpoint/services/area.service';
import AreaController from './controllers/area.controller';

// Registrar clases concretas
container.registerSingleton<ISingletonSqlConnection>('ISingletonSqlConnection', SingletonSqlConnection);
container.registerSingleton<IEntitiesService>('IEntityService', EntitiesService);
container.register<ISqlCommandOperationBuilder>('IOperationBuilder', { useClass: SqlCommandOperationBuilder });

//task
container.register<ITaskRepository>('ITaskRepository', { useClass: TaskRepository });
container.register<ITaskService>('ITaskService', { useClass: TaskService });
container.register<TaskController>('TaskController', { useClass: TaskController });

//user
container.register<IUserRepository>('IUserRepository', { useClass: UserRepository });
container.register<IUserService>('IUserService', { useClass: UserService });
container.register<UserController>('UserController', { useClass: UserController });

//auth
container.register<AuthController>('AuthController', { useClass: AuthController });

//role
container.register<IRoleRepository>('IRoleRepository', { useClass: RoleRepository });
container.register<IRoleService>('IRoleService', { useClass: RoleService });
container.register<RoleController>("RoleController", {useClass:RoleController});

//area
container.register<IAreaRepository>('IAreaRepository', { useClass: AreaRepository });
container.register<IAreaService>('IAreaService', { useClass: AreaService });
container.register<AreaController>('AreaController', { useClass: AreaController });