import { Schema, model, Model } from 'mongoose';

import { User } from '../interfaces/user.interface';

const UserSchema = new Schema<User>(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      required: true,
      emun: ['ADMIN_ROLE', 'USER_ROLE'],
    },
    state: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

UserSchema.methods.toJSON = function () {
  const { password, ...user } = this.toObject();
  return user;
};

const UserModel: Model<User> = model('users', UserSchema);

export default UserModel;
