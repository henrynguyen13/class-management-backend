import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document, Types } from 'mongoose';
import { User } from 'src/modules/users/schemas/user.schema';
import { IResponse } from 'src/modules/questions/questions.interface';
import { Type } from 'class-transformer';
import { AssignmentType } from 'src/modules/assignment/assignment.interface';

@Schema({
  timestamps: true,
})
export class Response extends Document {
  // @Prop()
  // response: IResponse[];

  @Prop({
    type: mongoose.Schema.Types.Mixed,
    default: [],
    required: function () {
      return (
        this.type === AssignmentType.TEST ||
        this.type === AssignmentType.UPLOAD_FILE
      );
    },
  })
  response: IResponse[] | any;

  // @Prop({
  //   type: [String],
  //   default: [],
  //   required: function () {
  //     return this.type === AssignmentType.UPLOAD_FILE;
  //   },
  // })
  // response: any;

  @Prop()
  classId: Types.ObjectId;

  // @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  // user: User;
  @Prop()
  type: AssignmentType;

  @Prop()
  userId: Types.ObjectId;

  @Prop()
  assignmentId: Types.ObjectId;

  @Prop()
  mark: string;

  @Prop()
  comment: string;

  @Type(() => User)
  user: User;
}

export const ResponseSchema = SchemaFactory.createForClass(Response);
ResponseSchema.virtual('user', {
  ref: 'User',
  localField: 'userId',
  foreignField: '_id',
});
