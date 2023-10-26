import { IBase } from 'src/common/common.interface';
import { User } from '../users/schemas/user.schema';
import { Class } from './schemas/class.schema';

export enum ClassStatus {
  CREATED = 'created',
  OPENING = 'opening',
  CLOSED = 'closed',
}

export interface IUpdateClass {
  id: string;
  name?: string;
  description?: string;
  status?: string;
  avatar?: string;
}

export interface IClass {
  class: Class;
  totalStudents: number;
}
