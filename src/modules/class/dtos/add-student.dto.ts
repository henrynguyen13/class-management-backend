import { IsEmail } from 'class-validator';

export class AddStudentDto {
  @IsEmail({}, { message: 'Please enter correct email' })
  email: string;
}
