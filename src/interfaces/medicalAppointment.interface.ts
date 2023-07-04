export interface MedicalAppointment {
  documentPatient: string;
  specialtyId?: string;
  appointmentDate: Date;
  doctorId?: string;
  patientId?: string;
  state: boolean;
}

export interface MedicalAppointmentResponse {
  total: number;
  appointments: Appointment[];
}

export interface Appointment {
  _id: string;
  documentPatient: string;
  specialtyId?: Specialty;
  appointmentDate: string;
  doctorId?: Doctor;
  state: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Specialty {
  _id: string;
  title: string;
  state: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Doctor {
  _id: string;
  firstName: string;
  lastName: string;
  specialtyId: string;
  office: string;
  contactEmail: string;
  state: boolean;
  // createdAt: string;
  // updatedAt: string;
}
