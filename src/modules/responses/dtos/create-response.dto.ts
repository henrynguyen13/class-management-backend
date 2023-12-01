import { Type } from 'class-transformer';
import {
  IsArray,
  IsBoolean,
  IsNumber,
  IsNumberString,
  IsString,
  ValidateNested,
} from 'class-validator';
import { IResponse } from 'src/modules/questions/questions.interface';

export class CreateResponseDto {
  @IsString()
  correctAnswer: string;

  @IsString()
  userAnswer: string;

  @IsBoolean()
  isCorrect: boolean;

  @IsNumber()
  seq: number;
}
