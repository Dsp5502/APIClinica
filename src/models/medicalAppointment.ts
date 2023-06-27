import { Schema, model, Model, Types } from 'mongoose';
import { MedicalAppointment } from '../interfaces/medicalAppointment.interface';

const MedicalAppointmentsSchema = new Schema<MedicalAppointment>(
  {
    documentPatient: {
      type: String,
      required: [true, 'El numero de documento es obligatorio'],
    },
    specialtyId: {
      type: Types.ObjectId,
      ref: 'specialities',
      required: [true, 'La especialidad es obligatoria'],
    },
    appointmentDate: {
      type: Date,
      required: [true, 'La fecha de la cita es obligatoria'],
    },
    doctorId: {
      type: Types.ObjectId,
      ref: 'doctors',
      required: [true, 'El doctor es obligatorio'],
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

MedicalAppointmentsSchema.methods.toJSON = function () {
  const { updatedAt, createdAt, ...medicalAppointments } = this.toObject();
  return medicalAppointments;
};

const MedicalAppointmentsModel: Model<MedicalAppointment> = model(
  'Medical Appointments',
  MedicalAppointmentsSchema
);

export default MedicalAppointmentsModel;
