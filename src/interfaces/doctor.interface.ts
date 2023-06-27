import { Types } from 'mongoose';

export interface Doctor {
  firstName: string;
  lastName: string;
  specialtyId?: string;
  office: string;
  contactEmail: string;
  state: boolean;
}

export interface DoctorsResult {
  total: number;
  doctors: Doctor[];
}
