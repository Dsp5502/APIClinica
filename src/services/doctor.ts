import { Doctor, DoctorsResult } from '../interfaces/doctor.interface';
import { Pagination } from '../interfaces/patient.interface';
import DoctorModel from '../models/doctor';
import SpecialityModel from '../models/specialties';

const insertDoctor = async (item: Doctor): Promise<Doctor> => {
  const resInsert = await DoctorModel.create(item);
  return resInsert;
};

const getAllDoctors = async ({
  query,
  limit,
  skip,
  searchTerm,
}: Pagination): Promise<DoctorsResult> => {
  if (searchTerm) {
    const specialtyIds = await SpecialityModel.find({
      title: { $regex: searchTerm, $options: 'i' },
    }).distinct('_id');

    const doctors = await DoctorModel.find({
      $or: [
        { firstName: { $regex: searchTerm, $options: 'i' } },
        { lastName: { $regex: searchTerm, $options: 'i' } },
        { office: { $regex: searchTerm, $options: 'i' } },
        { contactEmail: { $regex: searchTerm, $options: 'i' } },
        { specialtyId: { $in: specialtyIds } },
      ],
    })
      .skip(Number(skip))
      .limit(Number(limit));
    return {
      total: doctors.length,
      doctors,
    };
  }
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
