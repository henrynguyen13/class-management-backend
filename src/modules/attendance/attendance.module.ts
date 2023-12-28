import { Module } from '@nestjs/common';
import { AttendanceService } from './attendance.service';
import { AttendanceController } from './attendance.controller';
import { ClassModule } from '../class/class.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ClassSchema } from '../class/schemas/class.schema';
import { AttendanceSchema } from './schemas/attendance.schema';

@Module({
  imports: [
    ClassModule,
    MongooseModule.forFeature([
      { name: 'Class', schema: ClassSchema },
      { name: 'Attendance', schema: AttendanceSchema },
    ]),
  ],
  providers: [AttendanceService],
  controllers: [AttendanceController],
})
export class AttendanceModule {}
