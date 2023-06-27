import { ObjectId } from 'mongoose';

import PatientModel from '../models/patient';
import SpecialityModel from '../models/specialties';

import DoctorModel from '../models/doctor';
import RoleModel from '../models/role';
import UserModel from '../models/user';
import MedicalAppointmentsModel from '../models/medicalAppointment';

const existsPatientById = async (id: ObjectId): Promise<void> => {
  const existsPatient = await PatientModel.findById(id);
  if (!existsPatient || !existsPatient.state) {
    throw new Error(`The ID does not exist: ${id}`);
  }
};
const existsSpecialityById = async (id: ObjectId): Promise<void> => {
  const existsSpeciality = await SpecialityModel.findById(id);
  if (!existsSpeciality || !existsSpeciality.state) {
    throw new Error(`The ID does not exist: ${id}`);
  }
};
const existsDoctorById = async (id: ObjectId): Promise<void> => {
  const existsDoctor = await DoctorModel.findById(id);
  if (!existsDoctor || !existsDoctor.state) {
    throw new Error(`The ID does not exist: ${id}`);
  }
};
const existsMedicalAppointmentById = async (id: ObjectId): Promise<void> => {
  const existsMedicalAppointment = await MedicalAppointmentsModel.findById(id);
  if (!existsMedicalAppointment || !existsMedicalAppointment.state) {
    throw new Error(`The ID does not exist: ${id}`);
  }
};

const emailExists = async (email: string = ''): Promise<void> => {
  const existsEmail = await UserModel.findOne({ email });
  if (existsEmail) {
    throw new Error(`The email: ${email}, is already registered`);
  }
};
const PatientIdentificationExists = async (doc: string = ''): Promise<void> => {
  const existsPatient = await PatientModel.findOne({ identification: doc });
  if (!existsPatient) {
    throw new Error(`The document: ${doc}, not exist`);
  }
};
const emailDoctorExists = async (email: string = ''): Promise<void> => {
  const existsEmail = await DoctorModel.findOne({ email });
  if (existsEmail) {
    throw new Error(`The email: ${email}, is already registered`);
  }
};

const isRoleValid = async (role: string = ''): Promise<void> => {
  const existsRole = await RoleModel.findOne({ role });
  if (!existsRole) {
    throw new Error(`The role ${role} is not registered in the database`);
  }
};

export {
  emailDoctorExists,
  emailExists,
  existsDoctorById,
  existsPatientById,
  existsSpecialityById,
  isRoleValid,
  PatientIdentificationExists,
  existsMedicalAppointmentById,
};
