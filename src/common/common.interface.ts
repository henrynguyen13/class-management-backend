import { AxiosResponse } from 'axios';
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
export interface IGetListResponse<T> {
  items: T[];
  totalItems: number;
}

export interface IBase {
  createdAt: Date;
  createdBy: string;
  updatedAt: Date;
  updatedBy: string;
}

export type baseFields = 'createdAt' | 'createdBy' | 'updatedAt' | 'updatedBy';

// export interface IBodyResponse<T> extends AxiosResponse {
//   success?: boolean;
//   isRequestError?: boolean;
//   message?: string;
//   data: T;
// }

export interface IBodyResponse<T> {
  data: T;
}

export interface IJwtPayload {
  _id: string;
  username: string;
  role: string;
}
