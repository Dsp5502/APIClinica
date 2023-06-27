import { Schema, model, Model } from 'mongoose';

import { Patient } from '../interfaces/patient.interface';

const PatientSchema = new Schema<Patient>(
  {
    name: {
      type: String,
      required: [true, 'El nombre es obligatorio'],
    },
    identification: {
      type: String,
      required: [true, 'La identificación es obligatoria'],
      unique: true,
    },
    last_name: {
      type: String,
      required: true,
    },
    age: {
      type: Number,
      required: true,
    },
    phone: {
      type: String,
      required: true,
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

const PatientModel: Model<Patient> = model('Patients', PatientSchema);

export default PatientModel;
