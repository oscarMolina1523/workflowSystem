import swaggerJsdoc from "swagger-jsdoc";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "SYSTEM API",
      version: "1.0.0",
      description: "API to manage tasks by roles, permissions, and work areas",
      contact: {
        name: "Oscar Molina",
      },
    },
    servers: [
      {
        url: "http://localhost:3000",
        description: "Local server",
      },
      // {
      //   url: "https://evolution-system.vercel.app/",
      //   description: "Production server",
      // },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          // ✅ Nombre del esquema de seguridad
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
    security: [
      {
        bearerAuth: [], // ✅ Aplica globalmente a todos los endpoints
      },
    ],
  },
  apis: ["dist/WebApi/routes/*.js","src/WebApi/routes/*.ts", ],
};

const specs = swaggerJsdoc(options);
export default specs;