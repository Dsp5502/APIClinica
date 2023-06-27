import { Schema, model, Model } from 'mongoose';

import { Speciality } from '../interfaces/speciality.interface';

const SpecialitySchema = new Schema<Speciality>(
  {
    title: {
      type: String,
      required: [true, 'el title es obligatorio'],
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

const SpecialityModel: Model<Speciality> = model(
  'specialities',
  SpecialitySchema
);

export default SpecialityModel;
