import { Request, Response } from 'express';

import { loginUser, registerNewUser } from '../services/auth';

import { User } from '../interfaces/user.interface';

import { handleHttp } from '../utils/error.handle';

const RegisterController = async ({ body }: Request, res: Response) => {
  try {
    const { email, password, name, role } = body;
    const result: User = await registerNewUser({
      email,
      password,
      name,
      role,
    });

    res.status(201).json(result);
  } catch (error) {
    if (error instanceof Error) handleHttp(res, error.message);
    else handleHttp(res, 'Internal server error');
  }
};

const LoginController = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const User = await loginUser({ email, password });

    res.status(200).json(User);
  } catch (error) {
    if (error instanceof Error) handleHttp(res, error.message);
    else handleHttp(res, 'Internal server error');
  }
};

export { RegisterController, LoginController };
