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

const getPatient = async ({ params }: Request, res: Response) => {
  try {
    const { id } = params;
    const result = await getPatientById(id);
    if (!result) handleHttp(res, 'Patient not found', 404);
    else res.json(result);
  } catch (error) {
    if (error instanceof Error) handleHttp(res, error, 404);
    else handleHttp(res, 'ERROR_GET_PATIENT');
  }
};

const getPatients = async (req: Request, res: Response): Promise<void> => {
  try {
    const { limit = 5, skip = 0 } = req.query;
    const query = { state: true };
    const result = await getAllPatients({ query, limit, skip } as Pagination);
    res.send(result);
  } catch (error) {
    if (error instanceof Error) handleHttp(res, error, 400);
    else handleHttp(res, 'ERROR_GET_PATIENTS');
  }
};

const updatePatient = async ({ body, params }: Request, res: Response) => {
  try {
    const { id } = params;
    const result = await updateIdPatient(id, body);
    if (!result) {
      return res.status(404).json('Item not found');
    }
    res.send(result);
  } catch (error: any) {
    if (error instanceof Error) handleHttp(res, error, 400);
    else handleHttp(res, 'ERROR_UPDATE_PATIENT');
  }
};

const deletePatient = async ({ params }: Request, res: Response) => {
  try {
    const { id } = params;
    const result = await deletePatientByID(id);
    res.status(204).json(result);
  } catch (error: any) {
    handleHttp(res, 'ERROR_DELETE_PATIENT');
  }
};

const postPatient = async ({ body }: Request, res: Response): Promise<void> => {
  try {
    const result = await insertPatient(body);
    res.status(201).json(result);
  } catch (error) {
    if (error instanceof Error) handleHttp(res, error, 400);
    else handleHttp(res, 'ERROR_POST_PATIENT');
  }
};

export { getPatient, getPatients, updatePatient, postPatient, deletePatient };
