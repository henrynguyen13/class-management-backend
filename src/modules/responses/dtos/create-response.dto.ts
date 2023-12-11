import { IsBoolean, IsNumber, IsString } from 'class-validator';

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
