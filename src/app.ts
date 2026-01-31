import express, { Request, Response } from "express";
import apiRoutes from "./index.routes";
import { errorHandler } from "./middlewares/errorHandler";
import cors from "cors";

export const app = express();

/**
 * Middlewares
 */
app.use(express.json());
app.use(
  cors({
    origin: "*", // allow all origins (change for production)
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

/**
 * Health check
 */
app.get("/health", (_req: Request, res: Response) => {
  res.status(200).json({
    status: "ok",
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
  });
});

/**
 * API routes
 */
app.use("/api", apiRoutes);

/**
 * 404 handler (wrong routes)
 */
app.use((_req: Request, res: Response) => {
  res.status(404).json({
    message: "Route not found",
  });
});

/**
 * Global error handler
 */
app.use(errorHandler);
