import { Request, Response } from 'express';

import { Pagination } from '../interfaces/patient.interface';

import { handleHttp } from '../utils/error.handle';
import {
  deleteSpecialtyByID,
  getAllSpecialties,
  insertSpecialty,
  updateIdSpecialty,
} from '../services/specialties';

const getSpecialtiesController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { limit = 8, skip = 0 } = req.query;
    const query = { state: true };
    const result = await getAllSpecialties({
      query,
      limit,
      skip,
    } as Pagination);
    res.send(result);
  } catch (error) {
    if (error instanceof Error) handleHttp(res, error, 400);
    else handleHttp(res, 'ERROR_GET_PATIENTS');
  }
};

const editSpecialtyController = async (
  { body, params }: Request,
  res: Response
) => {
  try {
    const { id } = params;
    const result = await updateIdSpecialty(id, body);
    if (!result) {
      return res.status(404).json('Item not found');
    }
    res.send(result);
  } catch (error: any) {
    if (error instanceof Error) handleHttp(res, error, 400);
    else handleHttp(res, 'ERROR_UPDATE_PATIENT');
  }
};

const deleteSpecialityController = async (
  { params }: Request,
  res: Response
) => {
  try {
    const { id } = params;
    const result = await deleteSpecialtyByID(id);
    res.status(204).json(result);
  } catch (error: any) {
    handleHttp(res, 'ERROR_DELETE_PATIENT');
  }
};

const addSpecialtyController = async (
  { body }: Request,
  res: Response
): Promise<void> => {
  try {
    const result = await insertSpecialty(body);
    res.status(201).json(result);
  } catch (error) {
    if (error instanceof Error) handleHttp(res, error, 400);
    else handleHttp(res, 'ERROR_POST_PATIENT');
  }
};

export {
  getSpecialtiesController,
  editSpecialtyController,
  addSpecialtyController,
  deleteSpecialityController,
};
