import { NextFunction, Request, Response } from 'express';

import { FieldValidationError, validationResult } from 'express-validator';

import { handleHttp } from '../utils/error.handle';

const validateFields = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    handleHttp(res, errors.array() as FieldValidationError[], 400);
    return;
  }

  next();
};

export { validateFields };
