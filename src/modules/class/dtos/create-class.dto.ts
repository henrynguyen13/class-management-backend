import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ClassStatus } from '../class.interface';
import { User } from 'src/modules/users/schemas/user.schema';

export class CreateClassDto {
  @IsString()
  readonly code: string;

  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @IsString()
  readonly description: string;

  @IsString()
  @IsOptional()
  readonly status?: ClassStatus;

  @IsString()
  @IsOptional()
  readonly avatar?: string;

  readonly users: User[];
}
