import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';
import { User } from 'src/modules/users/schemas/user.schema';

@Schema({
  timestamps: true,
})
export class Messenger extends Document {
  @Prop()
  text: string;
  @Prop({ type: { type: mongoose.Schema.Types.ObjectId, ref: 'User' } })
  user: User;
}

export const MessengerSchema = SchemaFactory.createForClass(Messenger);

export class Message {
  name: string;
  text: string;
}
