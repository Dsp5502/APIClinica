import { NextFunction, Request, Response } from 'express';

import { JwtPayload } from 'jsonwebtoken';

import { verifyToken } from '../utils/jwt.handle';

interface RequestExtended extends Request {
  user?: string | JwtPayload;
}

const checkJwt = (
  req: RequestExtended,
  res: Response,
  next: NextFunction
): void => {
  try {
    const { authorization } = req.headers;
    if (!authorization) {
      res.status(401).json({ msg: 'Not exist token' });
      return;
    }

    const token: string = authorization.split(' ')[1];
    if (!token) {
      res.status(401).json({ msg: 'Not authorized ' });
      return;
    }

    const userToken: string | JwtPayload = verifyToken(`${token}`);

    if (!userToken) {
      res.status(401).json({ msg: 'Not authorized ' });
    } else {
      req.user = userToken;
      next();
    }
  } catch (error) {
    if (error instanceof Error) res.status(400).json({ error });
    else res.status(500).json({ msg: 'Something went wrong' });
  }
};

export { checkJwt };
