export interface Speciality {
  title: string;
  state?: boolean;
}

export interface SpecialityResult {
  total: number;
  patients: Speciality[];
}
