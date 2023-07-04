import { Request, Response } from 'express';

import { Pagination } from '../interfaces/patient.interface';

import { handleHttp } from '../utils/error.handle';
import {
  getAllMedicalAppointments,
  insertMedicalAppointment,
  getMedicalAppointmentbyid,
  deleteMedicalAppointmentByID,
} from '../services/medicalAppointment';

const getMedicalAppointment = async ({ params }: Request, res: Response) => {
  try {
    const { id } = params;
    const result = await getMedicalAppointmentbyid(id);
    if (!result) handleHttp(res, 'Medical Appointment not found', 404);
    else res.json(result);
  } catch (error) {
    if (error instanceof Error) handleHttp(res, error, 404);
    else handleHttp(res, 'ERROR_GET_MEDICAL_APPOINTMENT');
  }
};

const getMedicalAppointments = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { limit = 5, skip = 0, searchTerm = '' } = req.query;
    const query = { state: true };
    const result = await getAllMedicalAppointments({
      query,
      limit,
      skip,
      searchTerm,
    } as Pagination);
    res.send(result);
  } catch (error) {
    if (error instanceof Error) handleHttp(res, error, 400);
    else handleHttp(res, 'ERROR_GET_MEDICAL_APPOINTMENTS');
  }
};

const postMedicalAppointment = async (
  { body }: Request,
  res: Response
): Promise<void> => {
  try {
    const result = await insertMedicalAppointment(body);
    res.status(201).json(result);
  } catch (error) {
    if (error instanceof Error) handleHttp(res, error, 400);
    else handleHttp(res, 'ERROR_POST_MEDICAL_APPOINTMENT');
  }
};

const deleteMedicalAppointment = async ({ params }: Request, res: Response) => {
  try {
    const { id } = params;
    const result = await deleteMedicalAppointmentByID(id);
    res.status(204).json(result);
  } catch (error: any) {
    handleHttp(res, 'ERROR_MEDICAL_APPOINTMENT');
  }
};

export {
  deleteMedicalAppointment,
  getMedicalAppointment,
  getMedicalAppointments,
  postMedicalAppointment,
};
