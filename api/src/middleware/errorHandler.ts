import { Request, Response, NextFunction } from 'express';
import { MongoError } from 'mongodb';

// Custom error classes
export class AppError extends Error {
  statusCode: number;
  status: string;
  isOperational: boolean;

  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
    this.isOperational = true;

    Error.captureStackTrace(this, this.constructor);
  }
}

// Error handling middleware
export const errorHandler = (
  err: Error | AppError | MongoError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Default error values
  let statusCode = 500;
  let status = 'error';
  let message = 'Something went wrong';

  // Handle custom AppError
  if (err instanceof AppError) {
    statusCode = err.statusCode;
    status = err.status;
    message = err.message;
  }
  // Handle MongoDB errors
  else if (err instanceof MongoError) {
    switch (err.code) {
      case 11000: // Duplicate key error
        statusCode = 409;
        status = 'fail';
        message = 'A record with this value already exists';
        break;
      case 121: // Document validation error
        statusCode = 400;
        status = 'fail';
        message = 'Document validation failed';
        break;
      default:
        statusCode = 500;
        status = 'error';
        message = 'Database operation failed';
    }
  }

  // Log error in development
  if (process.env.NODE_ENV === 'development') {
    console.error('Error:', err);
  }

  // Send error response
  res.status(statusCode).json({
    status,
    message,
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
  });
};

// 404 Not Found middleware
export const notFoundHandler = (req: Request, res: Response, next: NextFunction) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
}; 