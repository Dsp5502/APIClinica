import { Schema, model, Model } from 'mongoose';

import { Role } from '../interfaces/role.interface';

const RoleSchema = new Schema<Role>(
  {
    role: {
      type: String,
      required: [true, 'El rol es obligatorio'],
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const RoleModel: Model<Role> = model('role', RoleSchema);

export default RoleModel;
