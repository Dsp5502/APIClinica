import { sign, verify } from 'jsonwebtoken';
import { JWT } from '../interfaces/auth.interface';

const JWT_SECRET = process.env.JWT_SECRET || 'secret';

const generateToken = async (user: JWT): Promise<string> => {
  const token = sign(user, JWT_SECRET, {
    expiresIn: '4h',
  });
  return token;
};

const verifyToken = (token: string) => {
  const decoded = verify(token, JWT_SECRET);
  return decoded;
};

export { generateToken, verifyToken };
