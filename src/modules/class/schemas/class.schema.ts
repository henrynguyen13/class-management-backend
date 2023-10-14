import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ClassStatus } from '../class.interface';
import { Document, SchemaType, Types } from 'mongoose';
import { User } from 'src/modules/users/schemas/user.schema';
@Schema({
  timestamps: true,
})
export class Class extends Document {
  @Prop()
  name: string;

  @Prop()
  description: string;

  @Prop()
  status: ClassStatus;

  @Prop()
  avatar: string;
  @Prop({ type: Types.ObjectId, ref: 'User' })
  users: User[];
}

export const ClassSchema = SchemaFactory.createForClass(Class);
