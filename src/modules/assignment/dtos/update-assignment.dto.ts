import { IsDate, IsOptional, IsString } from 'class-validator';
import { Types } from 'mongoose';
import { Prop } from '@nestjs/mongoose';
import { Question } from 'src/modules/questions/schemas/question.schema';

export class UpdateAssignmentDto {
  @IsOptional()
  @IsString()
  readonly name: string;

  @IsOptional()
  @IsString()
  readonly description: string;

  @IsOptional()
  @IsDate()
  readonly expiredAt: Date;

  @IsOptional()
  @Prop({ type: Types.ObjectId, ref: 'Question' })
  readonly question: Question;
}
