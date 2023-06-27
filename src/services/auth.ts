import { Auth, JWT } from '../interfaces/auth.interface';
import { User, UserJWT } from '../interfaces/user.interface';
import UserModel from '../models/user';
import { encrypts, verified } from '../utils/bcrypt.handle';
import { generateToken } from '../utils/jwt.handle';

type LoginResponse = {
  token: string;
  user: UserJWT;
};

const registerNewUser = async ({ email, password, name, role }: User) => {
  const userExists = await UserModel.findOne({ email });
  if (!userExists) {
    const passwordHash = await encrypts(password);

    const user = UserModel.create({
      email,
      password: passwordHash,
      name,
      role,
    });
    return user;
  }
  throw new Error('User already exists');
};

const loginUser = async ({ email, password }: Auth): Promise<object> => {
  const userExists: UserJWT | null = await UserModel.findOne({ email });

  if (userExists && userExists.state) {
    const passwordHash = userExists.password;
    const verifiedPassword = await verified(password, passwordHash);
    if (verifiedPassword) {
      const userData: JWT = {
        email: userExists.email,
        id: userExists.id,
        name: userExists.name,
        role: userExists.role,
      };
      const token = await generateToken(userData);
      const data: LoginResponse = {
        token,
        user: userExists,
      };

      return data;
    }
  }
  throw new Error('Password or email incorrect');
};

export { registerNewUser, loginUser };
