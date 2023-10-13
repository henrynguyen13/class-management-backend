import { Role } from 'src/common/common.interface';

export interface IUpdateUser {
  useranme?: string;
  password?: string;
  role?: Role;
}
