import { Response } from 'express';
import { FieldValidationError } from 'express-validator';
import { MongoError } from 'mongodb';

interface ErrorResponse {
  message: string;
  errors?: FieldValidationError[];
}

const handleHttp = (
  res: Response,
  error: Error | string | FieldValidationError[],
  code: number = 500
) => {
  let errorResponse: ErrorResponse;

  if (typeof error === 'string') {
    errorResponse = {
      message: error,
    };
  } else if (error instanceof Error) {
    errorResponse = {
      message: error.message,
      errors: (error as any).errors,
    };
  } else {
    errorResponse = {
      message: 'Validation error',
      errors: error,
    };
  }

  res.status(code).json(errorResponse);
};

export { handleHttp };
