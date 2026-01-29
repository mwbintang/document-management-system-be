import { Request, Response, NextFunction } from 'express';
import { AppError } from '../errors/AppError';
import httpStatus from "http-status";

export function errorHandler(
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
) {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      message: err.message,
    });
  }

  console.error(err);

  return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
    message: 'Internal server error',
  });
}
