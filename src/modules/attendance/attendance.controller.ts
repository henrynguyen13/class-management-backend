import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { AttendanceService } from './attendance.service';
import { CreateAttendanceDto } from './dtos/create-attendance.dto';

@Controller('attendance')
export class AttendanceController {
  constructor(private attendanceService: AttendanceService) {}

  @Post('/:classId')
  async createAttendance(
    @Body() body: CreateAttendanceDto,
    @Param('classId') classId: string,
  ) {
    return this.attendanceService.createAttendance(body, classId);
  }

  @Get('/:classId')
  async getAttendanceByClassId(@Param('classId') classId: string) {
    return this.attendanceService.getAttendanceByClassId(classId);
  }

  @Get('/:classId/absent/:studentCode')
  async getStudentAbsencesInClass(
    @Param('classId') classId: string,
    @Param('studentCode') studentCode: string,
  ) {
    return this.attendanceService.getStudentAbsencesInClass(
      classId,
      studentCode,
    );
  }
}
