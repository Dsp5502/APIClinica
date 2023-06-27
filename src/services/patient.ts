import {
  Pagination,
  Patient,
  PatientsResult,
} from '../interfaces/patient.interface';
import PatientModel from '../models/patient';

const insertPatient = async (item: Patient): Promise<Patient> => {
  const resInsert = await PatientModel.create(item);
  return resInsert;
};

const getAllPatients = async ({
  query,
  limit,
  skip,
}: Pagination): Promise<PatientsResult> => {
  const [total, patients] = await Promise.all([
    PatientModel.countDocuments(query),
    PatientModel.find(query).skip(Number(skip)).limit(Number(limit)),
  ]);
  return {
    total,
    patients,
  };
};

const getPatientById = async (id: string): Promise<Patient | null> => {
  const item = await PatientModel.findOne({ _id: id });
  return item;
};

const updateIdPatient = async (
  id: string,
  item: Patient
): Promise<Patient | null> => {
  const itemUpdate = await PatientModel.findOneAndUpdate({ _id: id }, item, {
    new: true,
  });
  return itemUpdate;
};

const deletePatientByID = async (id: string) => {
  const itemDelete = await PatientModel.findByIdAndUpdate(id, {
    state: false,
  });
  return itemDelete;
};

export {
  insertPatient,
  getAllPatients,
  getPatientById,
  updateIdPatient,
  deletePatientByID,
};
