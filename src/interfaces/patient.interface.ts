export interface Patient {
  age: Number;
  identification: String;
  last_name: String;
  name: String;
  phone: String;
  state: Boolean;
}

export interface PatientsResult {
  total: number;
  patients: Patient[];
}

export interface Pagination {
  limit: number;
  skip: number;
  query: {
    state: boolean;
  };
  searchTerm: string;
}
