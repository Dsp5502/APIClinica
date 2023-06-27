import { hash, compare } from 'bcryptjs';

const encrypts = async (password: string): Promise<string> => {
  const passwordHash = await hash(password, 10);
  return passwordHash;
};

const verified = async (password: string, hash: string): Promise<boolean> => {
  const verified = await compare(password, hash);
  return verified;
};

export { encrypts, verified };
