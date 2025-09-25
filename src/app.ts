import "reflect-metadata";
import express from 'express';
import { initializeDatabase } from './Infrastructure.Endpoint/database/init_db';
import "./WebApi/container";

const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.json());

async function startServer() {
    try {
        //console.log("Iniciando la base de datos...");
        await initializeDatabase(); // Ejecutar la inicialización aquí
        //console.log("Base de datos inicializada.");

        // Inicia el servidor solo después de que la base de datos esté lista
        app.listen(PORT, () => {
            console.log(`Server is running on http://localhost:${PORT}`);
        });
    } catch (error) {
        console.error("Error al iniciar el servidor:", error);
        process.exit(1); // Salir de la aplicación si hay un error crítico
    }
}

// Llama a la función de inicio
startServer();
