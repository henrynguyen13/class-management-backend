import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document, Types } from 'mongoose';
import { User } from 'src/modules/users/schemas/user.schema';
import { IResponse } from 'src/modules/questions/questions.interface';
import { Type } from 'class-transformer';

@Schema({
  timestamps: true,
})
export class Response extends Document {
  @Prop()
  response: IResponse[];

  @Prop()
  classId: Types.ObjectId;

  // @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  // user: User;

  @Prop()
  userId: Types.ObjectId;

  @Prop()
  assignmentId: Types.ObjectId;

  @Prop()
  mark: number;

  @Type(() => User)
  user: User;
}

export const ResponseSchema = SchemaFactory.createForClass(Response);
ResponseSchema.virtual('user', {
  ref: 'User',
  localField: 'userId',
  foreignField: '_id',
});
