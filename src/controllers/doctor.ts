import { Request, Response } from 'express';

import {
  deletePatientByID,
  getAllPatients,
  getPatientById,
  insertPatient,
  updateIdPatient,
} from '../services/patient';

import { Pagination } from '../interfaces/patient.interface';

import { handleHttp } from '../utils/error.handle';
import {
  deleteDoctortByID,
  getAllDoctors,
  getDoctorById,
  insertDoctor,
  updateIdDoctor,
} from '../services/doctor';

const getDoctor = async ({ params }: Request, res: Response) => {
  try {
    const { id } = params;
    const result = await getDoctorById(id);
    if (!result) handleHttp(res, 'Doctor not found', 404);
    else res.json(result);
  } catch (error) {
    if (error instanceof Error) handleHttp(res, error, 404);
    else handleHttp(res, 'ERROR_GET_DOCTOR');
  }
};

const getDoctors = async (req: Request, res: Response): Promise<void> => {
  try {
    const { limit = 5, skip = 0 } = req.query;
    const query = { state: true };
    const result = await getAllDoctors({ query, limit, skip } as Pagination);
    res.send(result);
  } catch (error) {
    if (error instanceof Error) handleHttp(res, error, 400);
    else handleHttp(res, 'ERROR_GET_DOCTORS');
  }
};

const updateDoctor = async ({ body, params }: Request, res: Response) => {
  try {
    const { id } = params;
    const result = await updateIdDoctor(id, body);
    if (!result) {
      return res.status(404).json('Doctor not found');
    }
    res.send(result);
  } catch (error: any) {
    if (error instanceof Error) handleHttp(res, error, 400);
    else handleHttp(res, 'ERROR_UPDATE_DOCTOR');
  }
};

const deleteDoctor = async ({ params }: Request, res: Response) => {
  try {
    const { id } = params;
    const result = await deleteDoctortByID(id);
    res.status(204).json(result);
  } catch (error: any) {
    handleHttp(res, 'ERROR_DELETE_DOCTOR');
  }
};

const postDoctor = async ({ body }: Request, res: Response): Promise<void> => {
  try {
    const result = await insertDoctor(body);
    res.status(201).json(result);
  } catch (error) {
    if (error instanceof Error) handleHttp(res, error, 400);
    else handleHttp(res, 'ERROR_POST_DOCTOR');
  }
};

export { getDoctor, getDoctors, updateDoctor, postDoctor, deleteDoctor };
