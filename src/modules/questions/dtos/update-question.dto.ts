import { IsArray, IsOptional, IsString } from 'class-validator';
import { IAnswer } from '../questions.interface';

export class UpdateQuestionDto {
  @IsOptional()
  @IsString()
  readonly text: string;

  @IsOptional()
  @IsArray()
  readonly answers: IAnswer[];
}
