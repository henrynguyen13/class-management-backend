import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { AssignmentService } from './assignment.service';
import { CreateAssignmentDto } from './dtos/create-assignment.dto';
import { Assignment } from './schemas/assignment.schema';
import { UpdateAssignmentDto } from './dtos/update-assignment.dto';
import { Query as ExpressQuery } from 'express-serve-static-core';
import { CreateQuestionDto, UpdateQuestionDto } from '../questions/dtos';

@Controller('classes/:classId/assignment')
export class AssignmentController {
  constructor(private assignmentService: AssignmentService) {}

  @Post('')
  async createAssignment(
    @Body() dto: CreateAssignmentDto,
    @Param('classId') classId: string,
  ): Promise<Assignment> {
    return this.assignmentService.createAssignment(dto, classId);
  }

  @Get('')
  async getAllAssignments(
    @Param('classId') classId: string,
    @Query() query: ExpressQuery,
  ) {
    return this.assignmentService.getAllAssignments(classId, query);
  }

  @Get('/:id')
  async getAssignmentById(
    @Param('id') assignmentId: string,
    @Param('classId') classId: string,
  ) {
    return this.assignmentService.getAssignmentById(classId, assignmentId);
  }

  @Patch('/:id')
  async updateAssignmentById(
    @Param('id') assignmentId: string,
    @Param('classId') classId: string,
    @Body() dto: UpdateAssignmentDto,
  ): Promise<Assignment> {
    return this.assignmentService.updateAssignmentById(
      classId,
      assignmentId,
      dto,
    );
  }

  @Delete('/:id')
  async deleteAssignment(
    @Param('id') assignmentId: string,
    @Param('classId') classId: string,
  ) {
    return this.assignmentService.deleteAssignment(classId, assignmentId);
  }

  @Post('/:id/question')
  async createAQuestion(
    @Param('id') assignmentId: string,
    @Param('classId') classId: string,
    @Body() dto: CreateQuestionDto,
  ) {
    return this.assignmentService.createAQuestion(classId, assignmentId, dto);
  }

  @Patch('/:id/question/:questionId')
  async updateAQuestion(
    @Param('id') assignmentId: string,
    @Param('classId') classId: string,
    @Param('questionId') questionId: string,
    @Body() dto: UpdateQuestionDto,
  ) {
    return this.assignmentService.updateAQuestion(
      classId,
      assignmentId,
      questionId,
      dto,
    );
  }

  @Get('/:id/question/:questionId')
  async getAQuestionDetail(
    @Param('id') assignmentId: string,
    @Param('classId') classId: string,
    @Param('questionId') questionId: string,
  ) {
    return this.assignmentService.getAQuestionDetail(
      classId,
      assignmentId,
      questionId,
    );
  }
  @Get('/:id/question')
  async getAllAQuestions(
    @Param('id') assignmentId: string,
    @Param('classId') classId: string,
  ) {
    return this.assignmentService.getAllAQuestions(classId, assignmentId);
  }

  @Delete('/:id/question/:questionId')
  async deleteAQuestion(
    @Param('id') assignmentId: string,
    @Param('classId') classId: string,
    @Param('questionId') questionId: string,
  ) {
    return this.assignmentService.deleteAQuestion(
      classId,
      assignmentId,
      questionId,
    );
  }
}
