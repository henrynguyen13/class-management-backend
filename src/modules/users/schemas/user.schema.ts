import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Role } from 'src/common/common.interface';
import { Document } from 'mongoose';
@Schema({
  timestamps: true,
})
export class User extends Document {
  @Prop()
  username: string;

  @Prop({ unique: [true, 'Duplicate email entered'] })
  email: string;

  @Prop()
  password: string;

  @Prop()
  role: Role;
  @Prop()
  token: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
