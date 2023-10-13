export interface IQuery {
  id?: string;
  page?: number;
  perPage?: number;
  sortBy?: string;
}

export enum Role {
  TEACHER = 'teacher',
  STUDENT = 'student',
}
