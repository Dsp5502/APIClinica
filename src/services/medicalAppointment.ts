import {
  Appointment,
  MedicalAppointment,
  MedicalAppointmentResponse,
} from '../interfaces/medicalAppointment.interface';
import { Pagination } from '../interfaces/patient.interface';
import DoctorModel from '../models/doctor';
import MedicalAppointmentsModel from '../models/medicalAppointment';
import PatientModel from '../models/patient';
import SpecialityModel from '../models/specialties';

const getAllMedicalAppointments = async ({
  query,
  limit,
  skip,
  searchTerm,
}: Pagination): Promise<MedicalAppointmentResponse | {}> => {
  if (searchTerm) {
    const specialtyIds = await SpecialityModel.find({
      title: { $regex: searchTerm, $options: 'i' },
    }).distinct('_id');

    const doctorsIds = await DoctorModel.find({
      $or: [
        { firstName: { $regex: searchTerm, $options: 'i' } },
        { lastName: { $regex: searchTerm, $options: 'i' } },
        { contactEmail: { $regex: searchTerm, $options: 'i' } },
      ],
    }).distinct('_id');

    const patientsIds = await PatientModel.find({
      $or: [
        { name: { $regex: searchTerm, $options: 'i' } },
        { last_name: { $regex: searchTerm, $options: 'i' } },
      ],
    }).distinct('_id');

    const appointments = await MedicalAppointmentsModel.find({
      $or: [
        { documentPatient: { $regex: searchTerm, $options: 'i' } },
        { specialtyId: { $in: specialtyIds } },
        { doctorId: { $in: doctorsIds } },
        { patientId: { $in: patientsIds } },
      ],
    })
      .populate({
        path: 'specialtyId',
        select: 'title',
      })
      .populate({
        path: 'doctorId',
        select: 'firstName lastName contactEmail',
      })
      .skip(Number(skip))
      .limit(Number(limit));
    return { total: appointments.length, appointments };
  }
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
