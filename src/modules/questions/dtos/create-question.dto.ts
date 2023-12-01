import { IsArray, IsNumber, IsString } from 'class-validator';
import { IAnswer } from '../questions.interface';

export class CreateQuestionDto {
  @IsString()
  readonly text: string;

  @IsArray()
  readonly answers: IAnswer[];
}
