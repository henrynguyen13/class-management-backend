import { IsDate, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { Types } from 'mongoose';
import { Prop } from '@nestjs/mongoose';
import { Question } from 'src/modules/questions/schemas/question.schema';

export class CreateAssignmentDto {
  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @IsString()
  readonly description: string;

  @IsDate()
  readonly expiredAt: Date;

  @IsOptional()
  @Prop({ type: Types.ObjectId, ref: 'Question' })
  readonly question: Question;
}
