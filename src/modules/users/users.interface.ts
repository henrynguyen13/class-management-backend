import { Role } from 'src/common/common.interface';

export interface IUser {
  username?: string;
  email?: string;
  role: Role;
}
export interface IUpdateUser {
  username?: string;
  password?: string;
  role?: Role;
}
