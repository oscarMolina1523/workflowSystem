import "reflect-metadata";
import express from 'express';
import { Server } from "socket.io";
import http from "http";
// import { initializeDatabase } from './Infrastructure.Endpoint/database/init_db';
import "./WebApi/container";
import swaggerUI from "swagger-ui-express";
import specs from "./WebApi/swagger/swagger";
import cors from 'cors';
import taskRoutes from "./WebApi/routes/task.routes";
import userRoutes from "./WebApi/routes/user.routes";
import authRoutes from "./WebApi/routes/auth.routes";
import { validateToken } from "./WebApi/utils/jwtUtils";
import roleRoutes from "./WebApi/routes/role.routes";
import areaRoutes from "./WebApi/routes/area.routes";
import { initializeDatabase } from "./Infrastructure.Endpoint/database/turso_db";
import logRoutes from "./WebApi/routes/log.routes";

const app = express();
const server = http.createServer(app);
const PORT = process.env.PORT || 3000;

// Configurar Socket.IO
const io = new Server(server, {
  cors: { origin: "*", methods: ["GET", "POST", "PUT", "DELETE"] },
});

// Conexión de clientes
io.on("connection", (socket) => {
  console.log("Cliente conectado:", socket.id);
  socket.on("disconnect", () => console.log("Cliente desconectado:", socket.id));
});

// Hacer io accesible desde cualquier middleware o ruta
app.set("io", io);

/**
 * Middleware que detecta cualquier cambio en tasks y notifica a todos los clientes
 */
app.use("/tasks", (req, res, next) => {
  res.on("finish", () => {
    if (["POST", "PUT", "DELETE"].includes(req.method)) {
      const io = app.get("io");
      io.emit("taskUpdated", { message: "Tasks changed" });
      console.log("Evento taskUpdated emitido");
    }
  });
  next();
});


app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors())

app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(specs));
app.use("/auth", authRoutes);
app.use("/tasks", validateToken, taskRoutes);
app.use("/users", validateToken, userRoutes);
app.use("/roles", validateToken, roleRoutes);
app.use("/areas", validateToken, areaRoutes);
app.use("/logs", validateToken, logRoutes);


async function startServer() {
    try {
        //console.log("Iniciando la base de datos...");
        await initializeDatabase(); // Ejecutar la inicialización aquí
        //console.log("Base de datos inicializada.");

        // Inicia el servidor solo después de que la base de datos esté lista
        server.listen(PORT, () => {
            console.log(`Server is running on http://localhost:${PORT}`);
        });
    } catch (error) {
        console.error("Error al iniciar el servidor:", error);
        process.exit(1); // Salir de la aplicación si hay un error crítico
    }
}

// Llama a la función de inicio
startServer();
