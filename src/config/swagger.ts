import swaggerJSDoc from "swagger-jsdoc";
import { env } from "./env";

export const swaggerSpec = swaggerJSDoc({
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Nodes API",
      version: "1.0.0",
      description: "API documentation for Nodes service",
    },
    servers: [
      {
        url: env.serverUrl,
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
    security: [{ bearerAuth: [] }],
  },
  apis: ["src/modules/**/**/*.route.ts", "src/modules/**/**/*.controller.ts"],
});
