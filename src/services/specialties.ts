import { Pagination } from '../interfaces/patient.interface';
import {
  Speciality,
  SpecialityResult,
} from '../interfaces/speciality.interface';
import SpecialityModel from '../models/specialties';

const insertSpecialty = async (item: Speciality): Promise<Speciality> => {
  const resInsert = await SpecialityModel.create(item);
  return resInsert;
};

const getAllSpecialties = async ({
  query,
  limit,
  skip,
}: Pagination): Promise<SpecialityResult> => {
  const [total, patients] = await Promise.all([
    SpecialityModel.countDocuments(query),
    SpecialityModel.find(query).skip(Number(skip)).limit(Number(limit)),
  ]);
  return {
    total,
    patients,
  };
};

const updateIdSpecialty = async (
  id: string,
  item: Speciality
): Promise<Speciality | null> => {
  const itemUpdate = await SpecialityModel.findOneAndUpdate({ _id: id }, item, {
    new: true,
  });
  return itemUpdate;
};

const deleteSpecialtyByID = async (id: string) => {
  const itemDelete = await SpecialityModel.findByIdAndUpdate(id, {
    state: false,
  });
  return itemDelete;
};

export {
  insertSpecialty,
  getAllSpecialties,
  updateIdSpecialty,
  deleteSpecialtyByID,
};
