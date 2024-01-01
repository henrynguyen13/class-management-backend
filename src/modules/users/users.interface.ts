import { IBase, Role } from 'src/common/common.interface';

export interface IUpdateUser {
  username?: string;
  password?: string;
  role?: Role;
  avatar?: string;
}
