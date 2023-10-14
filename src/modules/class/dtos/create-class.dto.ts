import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ClassStatus } from '../class.interface';
import { User } from 'src/modules/users/schemas/user.schema';

export class CreateClassDto {
  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @IsString()
  readonly description: string;

  @IsString()
  readonly status: ClassStatus;

  @IsString()
  @IsOptional()
  readonly avatar?: string;

  readonly users: User[];
}
