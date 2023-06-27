import { Schema, model, Model, Types } from 'mongoose';
import { Doctor } from '../interfaces/doctor.interface';

const DoctorSchema = new Schema<Doctor>(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    specialtyId: {
      type: Types.ObjectId,
      ref: 'Specialties',
      required: true,
    },
    office: {
      type: String,
      required: true,
    },
    contactEmail: {
      type: String,
      required: true,
      unique: true,
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

const DoctorModel: Model<Doctor> = model('doctors', DoctorSchema);

export default DoctorModel;
