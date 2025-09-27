// import sqlite3 from "sqlite3";
// import { open } from "sqlite";
// import { seedTasks } from "../data/info/task.data";
// import { seedAreas } from "../data/info/area.data";
// import { seedRoles } from "../data/info/role.data";
// import { seedUsers } from "../data/info/user.data";

// // Ruta de la base de datos
// const dbFilePath = "./app.db";

// export async function initializeDatabase(): Promise<void> {
//     const db = await open({
//         filename: dbFilePath,
//         driver: sqlite3.Database,
//     });

//     try {
//         //
//         // Lógica para la tabla de roles (ROLES)
//         //
//         await db.exec(`
//             CREATE TABLE IF NOT EXISTS ROLES (
//                 ID TEXT PRIMARY KEY,
//                 NAME TEXT NOT NULL UNIQUE,
//                 DESCRIPTION TEXT
//             );
//         `);

//         // Insertar roles
//         const insertRoleStmt = await db.prepare(`
//             INSERT OR IGNORE INTO ROLES (ID, NAME, DESCRIPTION) VALUES (?, ?, ?)
//         `);
//         for (const role of seedRoles) {
//             await insertRoleStmt.run(role.id, role.name, role.description);
//         }
//         await insertRoleStmt.finalize();
//         console.log("✅ Datos de ROLES insertados.");

//         //
//         // Lógica para la tabla de áreas (AREAS)
//         //
//         await db.exec(`
//             CREATE TABLE IF NOT EXISTS AREAS (
//                 ID TEXT PRIMARY KEY,
//                 TITLE TEXT NOT NULL,
//                 DESCRIPTION TEXT
//             );
//         `);

//         // Insertar áreas
//         const insertAreaStmt = await db.prepare(`
//             INSERT OR IGNORE INTO AREAS (ID, TITLE, DESCRIPTION) VALUES (?, ?, ?)
//         `);
//         for (const area of seedAreas) {
//             await insertAreaStmt.run(area.id, area.title, area.description);
//         }
//         await insertAreaStmt.finalize();
//         console.log("✅ Datos de AREAS insertados.");

//         //
//         // Lógica para la tabla de usuarios (USERS)
//         //
//         await db.exec(`
//             CREATE TABLE IF NOT EXISTS USERS (
//                 ID TEXT PRIMARY KEY,
//                 NAME TEXT NOT NULL,
//                 EMAIL TEXT NOT NULL UNIQUE,
//                 PASSWORD TEXT NOT NULL,
//                 AREA_ID TEXT NOT NULL,
//                 ROLE_ID TEXT NOT NULL
//             );
//         `);

//         // Insertar usuarios
//         const insertUserStmt = await db.prepare(`
//             INSERT OR IGNORE INTO USERS (ID, NAME, EMAIL, PASSWORD, AREA_ID, ROLE_ID) VALUES (?, ?, ?, ?, ?, ?)
//         `);
//         for (const user of seedUsers) {
//             await insertUserStmt.run(
//                 user.id,
//                 user.name,
//                 user.email,
//                 user.password,
//                 user.areaId,
//                 user.roleId
//             );
//         }
//         await insertUserStmt.finalize();
//         console.log("✅ Datos de USERS insertados.");

//         //
//         // Lógica para la tabla de tareas (TASKS)
//         //
//         await db.exec(`
//             CREATE TABLE IF NOT EXISTS TASKS (
//                 ID TEXT PRIMARY KEY,
//                 TITLE TEXT NOT NULL,
//                 DESCRIPTION TEXT,
//                 STATUS TEXT NOT NULL,
//                 AREA_ID TEXT NOT NULL,
//                 CREATED_BY TEXT NOT NULL,
//                 ASSIGNED_TO TEXT NOT NULL
//             );
//         `);

//         // Insertar tareas
//         const insertTaskStmt = await db.prepare(`
//             INSERT OR IGNORE INTO TASKS (ID, TITLE, DESCRIPTION, STATUS, AREA_ID, CREATED_BY, ASSIGNED_TO) VALUES (?, ?, ?, ?, ?, ?, ?)
//         `);
//         for (const task of seedTasks) {
//             await insertTaskStmt.run(
//                 task.id,
//                 task.title,
//                 task.description,
//                 task.status,
//                 task.areaId,
//                 task.createdBy,
//                 task.assignedTo
//             );
//         }
//         await insertTaskStmt.finalize();
//         console.log("✅ Datos de TASKS insertados.");

//         console.log("\n✅ Base de datos inicializada correctamente.");
//     } catch (error) {
//         console.error("❌ Error al inicializar la base de datos:", error);
//     } finally {
//         await db.close();
//         console.log("🔒 Conexión a la base de datos cerrada.");
//     }
// }

// // Ejecutar directamente si se llama como script
// initializeDatabase();
