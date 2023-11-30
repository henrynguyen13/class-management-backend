import { IsArray, IsString } from 'class-validator';
import { IAnswer } from '../questions.interface';

export class CreateQuestionDto {
  @IsString()
  readonly text: string;

  @IsArray()
  readonly answers: IAnswer[];

  @IsString()
  readonly isCorrect: string;
}
