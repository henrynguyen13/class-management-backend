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

  @Prop({ default: generateRandomCode })
  code: string;

  @Prop()
  password: string;

  @Prop()
  role: Role;
  @Prop()
  token: string;
}

export const UserSchema = SchemaFactory.createForClass(User);

function generateRandomCode(): string {
  const min = 100000;
  const max = 999999;
  const code = Math.floor(Math.random() * (max - min + 1)) + min;
  return code.toString();
}
