import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateAssignmentDto } from './dtos/create-assignment.dto';
import { InjectModel } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Assignment } from './schemas/assignment.schema';
import { Class } from '../class/schemas/class.schema';
import { UpdateAssignmentDto } from './dtos/update-assignment.dto';
@Injectable()
export class AssignmentService {
  constructor(
    @InjectModel(Assignment.name)
    private assignmentModel: mongoose.Model<Assignment>,
    @InjectModel(Class.name)
    private classModel: mongoose.Model<Class>,
  ) {}
  async createAssignment(
    dto: CreateAssignmentDto,
    classId: string,
  ): Promise<Assignment> {
    const mclass = await this.classModel.findById(classId).select('-users');
    if (!mclass) {
      throw new HttpException('No class found', HttpStatus.BAD_REQUEST);
    }
    const data = Object.assign({}, dto, { class: mclass });

    return await this.assignmentModel.create(data);
  }

  async getAssignmentById(
    classId: string,
    assignmentId: string,
  ): Promise<Assignment> {
    const mclass = await this.classModel.findById(classId);
    if (!mclass) {
      throw new HttpException('No class found', HttpStatus.BAD_REQUEST);
    }
    const assignment = await this.assignmentModel
      .findById(assignmentId)
      .populate({ path: 'class', select: '-users' })
      .exec();
    if (!assignment) {
      throw new HttpException('No assignment found', HttpStatus.BAD_REQUEST);
    }

    return assignment;
  }

  async updateAssignmentById(
    classId: string,
    assignmentId: string,
    dto: UpdateAssignmentDto,
  ): Promise<Assignment> {
    const mclass = await this.classModel.findById(classId);
    if (!mclass) {
      throw new HttpException('No class found', HttpStatus.BAD_REQUEST);
    }
    const assignment = await this.assignmentModel.findById(assignmentId);
    if (!assignment) {
      throw new HttpException('No assignment found', HttpStatus.BAD_REQUEST);
    }

    if (dto) {
      assignment.name = dto.name || assignment.name;
      assignment.description = dto.description || assignment.description;
      assignment.expiredAt = dto.expiredAt || assignment.expiredAt;
    }
    await assignment.save();

    return assignment;
  }
}
