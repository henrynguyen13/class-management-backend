import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { IAnswer } from '../questions.interface';
@Schema({
  timestamps: true,
})
export class Question extends Document {
  @Prop()
  text: string;

  @Prop({ type: [{ text: String, isCorrect: Boolean }] })
  answers: IAnswer[];
}

export const QuestionSchema = SchemaFactory.createForClass(Question);
