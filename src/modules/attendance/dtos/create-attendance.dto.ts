import { IsArray, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ICreateStudentAttendance } from '../attendance.interface';

export class CreateAttendanceDto {
  @IsString()
  readonly name: string;

  @IsArray()
  readonly students: ICreateStudentAttendance[];
}
