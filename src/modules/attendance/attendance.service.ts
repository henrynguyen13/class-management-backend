import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Class } from '../class/schemas/class.schema';
import * as mongoose from 'mongoose';
import { CreateAttendanceDto } from './dtos/create-attendance.dto';
import { Attendance } from './schemas/attendance.schema';
import { ICreateStudentAttendance } from './attendance.interface';
import { IGetListResponse, Role } from 'src/common/common.interface';
@Injectable()
export class AttendanceService {
  constructor(
    @InjectModel(Class.name)
    private classModel: mongoose.Model<Class>,
    @InjectModel(Attendance.name)
    private attendanceModel: mongoose.Model<Attendance>,
  ) {}

  async createAttendance(
    dto: CreateAttendanceDto,
    mclassId: string,
  ): Promise<Attendance> {
    const mclass = await this.classModel
      .findById(mclassId)
      .populate({ path: 'users', select: ['username', 'code', 'role'] })
      .exec();
    if (!mclass) {
      throw new HttpException('No class found', HttpStatus.BAD_REQUEST);
    }
    const mstudents: ICreateStudentAttendance[] = mclass.users
      .filter((user) => user.role === Role.STUDENT)
      .map((student) => ({
        code: student.code,
        attendance: dto.students.find((s) => s.code === student.code)
          ?.attendance,
      }));

    const data = {
      name: dto.name,
      students: mstudents,
    };

    const response = await this.attendanceModel.create(data);
    response.classId = mclassId;
    response.students = response.students.map((student) => ({
      ...student,
      username: mclass.users
        .filter((user) => user.role === Role.STUDENT)
        .find((user) => user.code === student.code)?.username,
    }));
    await response.save();

    return response;
  }

  async getAttendanceByClassId(
    classId: string,
  ): Promise<{ data: IGetListResponse<Attendance> }> {
    const attendances = await this.attendanceModel.find({ classId }).exec();
    if (!attendances) {
      throw new HttpException('No attendances found', HttpStatus.BAD_REQUEST);
    }
    return { data: { items: attendances, totalItems: attendances.length } };
  }

  async getStudentAbsencesInClass(classId: string, studentCode: string) {
    const attendances = await this.attendanceModel.find({ classId }).exec();
    if (!attendances) {
      throw new HttpException('No attendances found', HttpStatus.BAD_REQUEST);
    }
    const absences = attendances
      .map((attendance) =>
        attendance.students.filter((student) => student.code === studentCode),
      )
      .flat()
      .filter(
        (attend) => attend.attendance === null || attend.attendance === false,
      ).length;

    return { absences };
  }
}
