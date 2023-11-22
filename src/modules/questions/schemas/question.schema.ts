import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { IAnswer } from '../questions.interface';
import { Class } from 'src/modules/class/schemas/class.schema';
import { Assignment } from 'src/modules/assignment/schemas/assignment.schema';
@Schema({
  timestamps: true,
})
export class Question extends Document {
  @Prop()
  text: string;

  @Prop({ type: [{ text: String, isCorrect: Boolean }] })
  answers: IAnswer[];

  @Prop()
  classId: string;

  @Prop()
  assignmentId: string;
}

export const QuestionSchema = SchemaFactory.createForClass(Question);
