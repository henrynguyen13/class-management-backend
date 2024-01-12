import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateAssignmentDto } from './dtos/create-assignment.dto';
import { InjectModel } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Assignment } from './schemas/assignment.schema';
import { Class } from '../class/schemas/class.schema';
import { UpdateAssignmentDto } from './dtos/update-assignment.dto';
import { Query } from 'express-serve-static-core';
import { Common } from 'src/common/common.constants';
import { IGetListResponse } from 'src/common/common.interface';
import { CreateQuestionDto, UpdateQuestionDto } from '../questions/dtos';
import { Question } from '../questions/schemas/question.schema';
import { Response } from '../responses/schemas/response.schema';
import { CreateResponseDto } from '../responses/dtos/create-response.dto';
import { AssignmentType } from './assignment.interface';
import { CreateMarkResponseDto } from '../responses/dtos/create-mark-response.dto';
@Injectable()
export class AssignmentService {
  constructor(
    @InjectModel(Assignment.name)
    private assignmentModel: mongoose.Model<Assignment>,
    @InjectModel(Class.name)
    private classModel: mongoose.Model<Class>,
    @InjectModel(Question.name)
    private questionModel: mongoose.Model<Question>,
    @InjectModel(Response.name)
    private responseModel: mongoose.Model<Response>,
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
  async getAllAssignments(
    classId: string,
    query: Query,
  ): Promise<{ data: IGetListResponse<Assignment> }> {
    const mclass = await this.classModel.findById(classId);
    if (!mclass) {
      throw new HttpException('No class found', HttpStatus.BAD_REQUEST);
    }
    const perPage = Common.PERPAGE;
    const currentPage = Number(query.page) || Common.PAGE;
    const skip = perPage * (currentPage - 1);
    const allAssignments = await this.assignmentModel.find({
      class: { _id: classId },
    });
    const assignments = await this.assignmentModel
      .find({ class: { _id: classId } })
      .limit(perPage)
      .sort({ expiredAt: -1 })
      .skip(skip)
      .populate({ path: 'class', select: '-users' })
      .exec();
    return { data: { items: assignments, totalItems: allAssignments.length } };
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
      .populate({
        path: 'question',
      })
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

  async deleteAssignment(
    classId: string,
    assignmentId: string,
  ): Promise<Assignment> {
    const mclass = await this.classModel.findById(classId);
    if (!mclass) {
      throw new HttpException('No class found', HttpStatus.BAD_REQUEST);
    }
    const assignment = await this.assignmentModel.findById(assignmentId);
    if (!assignment) {
      throw new HttpException('No assignment found', HttpStatus.BAD_REQUEST);
    }

    return await this.assignmentModel.findByIdAndDelete(assignmentId);
  }

  async createAQuestion(
    classId: string,
    assignmentId: string,
    dto: CreateQuestionDto,
  ): Promise<Question> {
    const mclass = await this.classModel.findById(classId);
    if (!mclass) {
      throw new HttpException('No class found', HttpStatus.BAD_REQUEST);
    }
    const assignment = await this.assignmentModel.findById(assignmentId);
    if (!assignment) {
      throw new HttpException('No assignment found', HttpStatus.BAD_REQUEST);
    }
    assignment.type = AssignmentType.TEST;
    await assignment.save();

    const questionData = {
      ...dto,
      classId: mclass._id,
      assignmentId: assignment._id,
    };
    return await this.questionModel.create(questionData);
  }

  async updateAQuestion(
    classId: string,
    assignmentId: string,
    questionId: string,
    dto: UpdateQuestionDto,
  ): Promise<Question> {
    const mclass = await this.classModel.findById(classId);
    if (!mclass) {
      throw new HttpException('No class found', HttpStatus.BAD_REQUEST);
    }
    const assignment = await this.assignmentModel.findById(assignmentId);
    if (!assignment) {
      throw new HttpException('No assignment found', HttpStatus.BAD_REQUEST);
    }
    const question = await this.questionModel.findById(questionId);
    if (!question) {
      throw new HttpException('No question found', HttpStatus.BAD_REQUEST);
    }

    if (dto.text) {
      question.text = dto.text;
    }
    if (dto.answers) {
      question.answers = dto.answers;
    }

    await question.save();
    return question;
  }

  async getAQuestionDetail(
    classId: string,
    assignmentId: string,
    questionId: string,
  ): Promise<Question> {
    const mclass = await this.classModel.findById(classId);
    if (!mclass) {
      throw new HttpException('No class found', HttpStatus.BAD_REQUEST);
    }
    const assignment = await this.assignmentModel.findById(assignmentId);
    if (!assignment) {
      throw new HttpException('No assignment found', HttpStatus.BAD_REQUEST);
    }
    const question = await this.questionModel.findById(questionId).exec();
    if (!question) {
      throw new HttpException('No question found', HttpStatus.BAD_REQUEST);
    }

    return question;
  }

  async getAllAQuestions(
    classId: string,
    assignmentId: string,
  ): Promise<{ data: IGetListResponse<Question> }> {
    const mclass = await this.classModel.findById(classId);
    if (!mclass) {
      throw new HttpException('No class found', HttpStatus.BAD_REQUEST);
    }
    const assignment = await this.assignmentModel.findById(assignmentId);
    if (!assignment) {
      throw new HttpException('No assignment found', HttpStatus.BAD_REQUEST);
    }
    // const objectIdClassId = new mongoose.Types.ObjectId(classId);
    // const objectIdAssignmentId = new mongoose.Types.ObjectId(assignmentId);
    const allQuestions = await this.questionModel
      .find({
        classId,
        assignmentId,
      })
      .exec();
    return { data: { items: allQuestions, totalItems: allQuestions.length } };
  }

  async deleteAQuestion(
    classId: string,
    assignmentId: string,
    questionId: string,
  ): Promise<Question> {
    const mclass = await this.classModel.findById(classId);
    if (!mclass) {
      throw new HttpException('No class found', HttpStatus.BAD_REQUEST);
    }
    const assignment = await this.assignmentModel.findById(assignmentId);
    if (!assignment) {
      throw new HttpException('No assignment found', HttpStatus.BAD_REQUEST);
    }
    const question = await this.questionModel.findById(questionId);
    if (!question) {
      throw new HttpException('No question found', HttpStatus.BAD_REQUEST);
    }

    return await this.questionModel.findByIdAndDelete(questionId);
  }

  async createATestResponse(
    userId: string,
    classId: string,
    assignmentId: string,
    dto: CreateResponseDto[],
  ): Promise<Response> {
    const mclass = await this.classModel.findById(classId);
    if (!mclass) {
      throw new HttpException('No class found', HttpStatus.BAD_REQUEST);
    }
    const assignment = await this.assignmentModel.findById(assignmentId);
    if (!assignment) {
      throw new HttpException('No assignment found', HttpStatus.BAD_REQUEST);
    }

    const responseData = {
      response: dto,
      userId,
      classId,
      type: AssignmentType.TEST,
      assignmentId,
      mark: ((dto.filter((i) => i.isCorrect).length / dto.length) * 10).toFixed(
        2,
      ),
    };
    return await this.responseModel.create(responseData);
  }

  async createAUploadResponse(
    userId: string,
    classId: string,
    assignmentId: string,
    dto: any,
  ): Promise<Response> {
    const mclass = await this.classModel.findById(classId);
    if (!mclass) {
      throw new HttpException('No class found', HttpStatus.BAD_REQUEST);
    }
    const assignment = await this.assignmentModel.findById(assignmentId);
    if (!assignment) {
      throw new HttpException('No assignment found', HttpStatus.BAD_REQUEST);
    }
    const responseData = {
      response: dto,
      userId,
      classId,
      type: AssignmentType.UPLOAD_FILE,
      assignmentId,
      mark: '',
    };

    console.log('responseData', responseData);
    return await this.responseModel.create(responseData);
  }

  async getAResponses(
    userId: string,
    classId: string,
    assignmentId: string,
    query: Query,
  ): Promise<{ data: IGetListResponse<Response> }> {
    const perPage = Common.PERPAGE;
    const currentPage = Number(query.page) || Common.PAGE;
    const skip = perPage * (currentPage - 1);
    const mclass = await this.classModel.findById(classId);
    if (!mclass) {
      throw new HttpException('No class found', HttpStatus.BAD_REQUEST);
    }
    const assignment = await this.assignmentModel.findById(assignmentId);
    if (!assignment) {
      throw new HttpException('No assignment found', HttpStatus.BAD_REQUEST);
    }
    const responses = await this.responseModel
      .find({
        userId,
        classId,
        assignmentId,
      })
      .populate([
        {
          path: 'user',
          select: ['username', 'email'],
        },
      ])
      .sort({ createdAt: -1 })
      .limit(perPage)
      .skip(skip)
      .lean()
      .exec();
    return { data: { items: responses, totalItems: responses.length } };
  }

  async getAllAResposes(
    classId: string,
    assignmentId: string,
  ): Promise<{ data: IGetListResponse<Response> }> {
    const mclass = await this.classModel.findById(classId);
    if (!mclass) {
      throw new HttpException('No class found', HttpStatus.BAD_REQUEST);
    }
    const assignment = await this.assignmentModel.findById(assignmentId);
    if (!assignment) {
      throw new HttpException('No assignment found', HttpStatus.BAD_REQUEST);
    }

    const responses = await this.responseModel
      .find({
        classId,
        assignmentId,
      })
      .populate({
        path: 'user',
        select: ['username', 'email'],
      })
      .sort({ createdAt: -1 })
      .lean()
      .exec();

    const seenEmails: Set<String> = new Set();
    //return latest response of user
    const filterResponses = [];
    for (const response of responses) {
      const userEmail = response.user[0].email;
      if (!seenEmails.has(userEmail)) {
        seenEmails.add(userEmail);
        filterResponses.push(response);
      }
    }

    return {
      data: { items: filterResponses, totalItems: filterResponses.length },
    };
  }

  async getAResponseById(
    classId: string,
    assignmentId: string,
    responseId: string,
  ): Promise<Response> {
    const mclass = await this.classModel.findById(classId);
    if (!mclass) {
      throw new HttpException('No class found', HttpStatus.BAD_REQUEST);
    }
    const assignment = await this.assignmentModel.findById(assignmentId);
    if (!assignment) {
      throw new HttpException('No assignment found', HttpStatus.BAD_REQUEST);
    }

    const response = await this.responseModel
      .findById(responseId)
      .populate({
        path: 'user',
        select: ['username', 'email'],
      })
      .lean()
      .exec();

    if (!response) {
      throw new HttpException('No response found', HttpStatus.BAD_REQUEST);
    }

    return response;
  }

  async markResponse(
    classId: string,
    assignmentId: string,
    responseId: string,
    dto: CreateMarkResponseDto,
  ): Promise<Response> {
    const response = await this.getAResponseById(
      classId,
      assignmentId,
      responseId,
    );

    if (response) {
      await this.responseModel.findByIdAndUpdate(responseId, {
        $set: {
          mark: dto?.mark ?? '',
          comment: dto?.comment ?? '',
        },
      });

      const updatedResponse = await this.responseModel
        .findById(response._id)
        .populate({
          path: 'user',
          select: ['username', 'email'],
        })
        .lean()
        .exec();

      if (!updatedResponse) {
        throw new HttpException('No response found', HttpStatus.BAD_REQUEST);
      }

      return updatedResponse;
    }
  }
}
