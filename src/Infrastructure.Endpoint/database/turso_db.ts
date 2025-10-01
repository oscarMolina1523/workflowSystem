import { createClient } from "@libsql/client";
import { seedTasks } from "../data/info/task.data";
import { seedAreas } from "../data/info/area.data";
import { seedRoles } from "../data/info/role.data";
import { seedUsers } from "../data/info/user.data";

const dbUrl = process.env.TURSO_DB_URL || "not-found";
const token = process.env.TURSO_DB_AUTH_TOKEN || "not-found";

export async function initializeDatabase(): Promise<void> {
  const db = createClient({ url: dbUrl, authToken: token });

  try {
    // ---------------------------
    // ROLES
    // ---------------------------
    await db.execute(`
      CREATE TABLE IF NOT EXISTS ROLES (
        ID TEXT PRIMARY KEY,
        NAME TEXT NOT NULL UNIQUE,
        DESCRIPTION TEXT
      );
    `);

    for (const role of seedRoles) {
      await db.execute(
        `INSERT OR IGNORE INTO ROLES (ID, NAME, DESCRIPTION) VALUES (?, ?, ?)`,
        [role.id, role.name, role.description ?? null]
      );
    }
    console.log("✅ Datos de ROLES insertados.");

    // ---------------------------
    // AREAS
    // ---------------------------
    await db.execute(`
      CREATE TABLE IF NOT EXISTS AREAS (
        ID TEXT PRIMARY KEY,
        TITLE TEXT NOT NULL,
        DESCRIPTION TEXT
      );
    `);

    for (const area of seedAreas) {
      await db.execute(
        `INSERT OR IGNORE INTO AREAS (ID, TITLE, DESCRIPTION) VALUES (?, ?, ?)`,
        [area.id, area.title, area.description ?? null]
      );
    }
    console.log("✅ Datos de AREAS insertados.");

    // ---------------------------
    // USERS
    // ---------------------------
    await db.execute(`
      CREATE TABLE IF NOT EXISTS USERS (
        ID TEXT PRIMARY KEY,
        NAME TEXT NOT NULL,
        EMAIL TEXT NOT NULL UNIQUE,
        PASSWORD TEXT NOT NULL,
        AREA_ID TEXT NOT NULL,
        ROLE_ID TEXT NOT NULL
      );
    `);

    for (const user of seedUsers) {
      await db.execute(
        `INSERT OR IGNORE INTO USERS (ID, NAME, EMAIL, PASSWORD, AREA_ID, ROLE_ID) VALUES (?, ?, ?, ?, ?, ?)`,
        [
          user.id,
          user.name,
          user.email,
          user.password,
          user.areaId,
          user.roleId,
        ]
      );
    }
    console.log("✅ Datos de USERS insertados.");

    // ---------------------------
    // TASKS
    // ---------------------------
    await db.execute(`
      CREATE TABLE IF NOT EXISTS TASKS (
        ID TEXT PRIMARY KEY,
        TITLE TEXT NOT NULL,
        DESCRIPTION TEXT,
        STATUS TEXT NOT NULL,
        AREA_ID TEXT NOT NULL,
        CREATED_BY TEXT NOT NULL,
        ASSIGNED_TO TEXT NOT NULL
      );
    `);

    for (const task of seedTasks) {
      await db.execute(
        `INSERT OR IGNORE INTO TASKS (ID, TITLE, DESCRIPTION, STATUS, AREA_ID, CREATED_BY, ASSIGNED_TO) VALUES (?, ?, ?, ?, ?, ?, ?)`,
        [
          task.id,
          task.title,
          task.description ?? null,
          task.status,
          task.areaId,
          task.createdBy,
          task.assignedTo,
        ]
      );
    }
    console.log("✅ Datos de TASKS insertados.");

    await db.execute(`
      CREATE TABLE IF NOT EXISTS LOGS (
        ID TEXT PRIMARY KEY,
        USER_ID TEXT NOT NULL,
        ACTION TEXT NOT NULL,
        AREA_ID TEXT NOT NULL,
        DATE_LOGGED TEXT NOT NULL
      );
    `);

    console.log("✅ Tabla LOGS creada.");

    console.log("✅ Base de datos inicializada correctamente en Turso.");
  } catch (error) {
    console.error("❌ Error al inicializar la base de datos:", error);
  } finally {
    await db.close();
  }
}

// Ejecutar directamente si se llama como script
initializeDatabase();
