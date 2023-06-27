import {
  Appointment,
  MedicalAppointment,
  MedicalAppointmentResponse,
} from '../interfaces/medicalAppointment.interface';
import { Pagination } from '../interfaces/patient.interface';
import MedicalAppointmentsModel from '../models/medicalAppointment';

const getAllMedicalAppointments = async ({
  query,
  limit,
  skip,
}: Pagination): Promise<MedicalAppointmentResponse | {}> => {
  const [total, appointments] = await Promise.all([
    MedicalAppointmentsModel.countDocuments(query),
    MedicalAppointmentsModel.find(query)
      .populate({
        path: 'specialtyId',
        select: 'title',
      })
      .populate({
        path: 'doctorId',
        select: 'firstName lastName contactEmail',
      })
      .skip(Number(skip))
      .limit(Number(limit)),
  ]);

  if (!appointments) return {};

  return { total, appointments };
};

const insertMedicalAppointment = async (
  item: MedicalAppointment
): Promise<MedicalAppointment> => {
  const resInsert = await MedicalAppointmentsModel.create(item);
  return resInsert;
};

const getMedicalAppointmentbyid = async (
  id: string
): Promise<Appointment | {}> => {
  const item = await MedicalAppointmentsModel.findOne({ _id: id })
    .populate({
      path: 'specialtyId',
      select: 'title',
    })
    .populate({
      path: 'doctorId',
      select: 'firstName lastName contactEmail',
    });

  return item ?? {};
};

const deleteMedicalAppointmentByID = async (id: string) => {
  const itemDelete = await MedicalAppointmentsModel.findByIdAndUpdate(id, {
    state: false,
  });
  return itemDelete;
};

export {
  deleteMedicalAppointmentByID,
  getAllMedicalAppointments,
  getMedicalAppointmentbyid,
  insertMedicalAppointment,
};
