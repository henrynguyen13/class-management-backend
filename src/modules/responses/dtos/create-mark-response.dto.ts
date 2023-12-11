import { IsBoolean, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateMarkResponseDto {
  @IsString()
  mark: string;

  @IsString()
  @IsOptional()
  comment: string;
}
