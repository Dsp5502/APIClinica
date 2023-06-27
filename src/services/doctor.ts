import { Doctor, DoctorsResult } from '../interfaces/doctor.interface';
import { Pagination } from '../interfaces/patient.interface';
import DoctorModel from '../models/doctor';

const insertDoctor = async (item: Doctor): Promise<Doctor> => {
  const resInsert = await DoctorModel.create(item);
  return resInsert;
};

const getAllDoctors = async ({
  query,
  limit,
  skip,
}: Pagination): Promise<DoctorsResult> => {
  const [total, doctors] = await Promise.all([
    DoctorModel.countDocuments(query),
    DoctorModel.find(query).skip(Number(skip)).limit(Number(limit)),
  ]);
  return {
    total,
    doctors,
  };
};

const getDoctorById = async (id: string): Promise<Doctor | null> => {
  const item = await DoctorModel.findOne({ _id: id });
  return item;
};

const updateIdDoctor = async (
  id: string,
  item: Doctor
): Promise<Doctor | null> => {
  const itemUpdate = await DoctorModel.findOneAndUpdate({ _id: id }, item, {
    new: true,
  });
  return itemUpdate;
};

const deleteDoctortByID = async (id: string) => {
  const itemDelete = await DoctorModel.findByIdAndUpdate(id, {
    state: false,
  });
  return itemDelete;
};

export {
  insertDoctor,
  getAllDoctors,
  getDoctorById,
  updateIdDoctor,
  deleteDoctortByID,
};
