import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Document } from 'mongoose';
import { Class } from 'src/modules/class/schemas/class.schema';
import { IGetStudentAttendance } from '../attendance.interface';
@Schema({
  timestamps: true,
})
export class Attendance extends Document {
  @Prop()
  name: string;

  @Prop()
  students: IGetStudentAttendance[];

  @Prop()
  classId: string;
}

export const AttendanceSchema = SchemaFactory.createForClass(Attendance);
