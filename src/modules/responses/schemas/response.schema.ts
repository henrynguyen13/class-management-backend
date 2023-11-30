import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

import { IResponse } from 'src/modules/questions/questions.interface';
@Schema({
  timestamps: true,
})
export class Response extends Document {
  @Prop()
  response: IResponse[];

  @Prop()
  classId: string;

  @Prop()
  userId: string;
  @Prop()
  assignmentId: string;

  @Prop()
  mark: number;
}

export const ResponseSchema = SchemaFactory.createForClass(Response);
