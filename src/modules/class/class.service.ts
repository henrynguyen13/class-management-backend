import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Class } from './schemas/class.schema';
import mongoose from 'mongoose';
import { Query } from 'express-serve-static-core';
import { Common } from 'src/common/common.constants';
import { IUpdateClass } from './class.interface';
import { CreateClassDto } from './dtos/create-class.dto';
import { User } from '../users/schemas/user.schema';
import { IUser } from '../users/users.interface';
import { Role } from 'src/common/common.interface';
import { AddStudentDto } from './dtos/add-student.dto';
@Injectable()
export class ClassService {
  constructor(
    @InjectModel(Class.name)
    private classModel: mongoose.Model<Class>,

    @InjectModel(User.name)
    private userModel: mongoose.Model<User>,
  ) {}

  async findAll(query: Query): Promise<Class[]> {
    const perPage = Common.PERPAGE;
    const currentPage = Number(query.page) || Common.PAGE;
    const skip = perPage * (currentPage - 1);
    const keyword = query.keyword
      ? {
          username: {
            $regex: query.keyword,
            $options: 'i',
          },
        }
      : {};

    const classes = await this.classModel
      .find({ ...keyword })
      .limit(perPage)
      .skip(skip);
    return classes;
  }

  async createClass(dto: CreateClassDto, users: User[]): Promise<Class> {
    const data = Object.assign({}, dto, { users });
    return await this.classModel.create(data);
  }
  async findById(id: string): Promise<Class> {
    const mclass = await this.classModel.findById(id).populate('users').exec();

    if (!mclass) {
      throw new HttpException('No class found', HttpStatus.BAD_REQUEST);
    }
    console.log('Populated class:', mclass);
    return mclass;
  }

  async updateClassById(id: string, dto: IUpdateClass): Promise<Class> {
    return await this.classModel.findByIdAndUpdate(id, dto, {
      new: true,
      runValidators: true,
    });
  }

  async deleteClass(id: string): Promise<Class> {
    return await this.classModel.findByIdAndDelete(id);
  }

  async addStudentToClass(classId: string, dto: AddStudentDto): Promise<Class> {
    const mclass = await this.classModel.findById(classId).exec();

    if (!mclass)
      throw new HttpException('No class found', HttpStatus.BAD_REQUEST);

    const student = await this.userModel.findOne({ email: dto.email }).exec();
    if (!student)
      throw new HttpException(
        'This email is not registered',
        HttpStatus.BAD_REQUEST,
      );

    if (student.role !== Role.STUDENT) {
      throw new HttpException('User is not a student', HttpStatus.BAD_REQUEST);
    }
    if (!mclass.users) {
      mclass.users = [];
    }

    mclass.users.push(student);
    await mclass.save();
    console.log('Updated class:', mclass);
    return mclass;
  }
}
