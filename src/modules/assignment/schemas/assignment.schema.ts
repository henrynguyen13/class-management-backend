import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Class } from 'src/modules/class/schemas/class.schema';
import { Document, Types } from 'mongoose';
import { Question } from 'src/modules/questions/schemas/question.schema';
import { AssignmentType } from '../assignment.interface';
@Schema({
  timestamps: true,
})
export class Assignment extends Document {
  @Prop()
  name: string;

  @Prop()
  description: string;

  @Prop()
  expiredAt: Date;

  @Prop({ default: AssignmentType.UPLOAD_FILE })
  type: AssignmentType;

  @Prop({ type: Types.ObjectId, ref: 'Question' })
  question: Question;

  @Prop({ type: Types.ObjectId, ref: 'Class' })
  class: Class;
}
export const AssignmentSchema = SchemaFactory.createForClass(Assignment);
