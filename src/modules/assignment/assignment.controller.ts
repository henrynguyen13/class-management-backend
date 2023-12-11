import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UploadedFile,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AssignmentService } from './assignment.service';
import { CreateAssignmentDto } from './dtos/create-assignment.dto';
import { Assignment } from './schemas/assignment.schema';
import { UpdateAssignmentDto } from './dtos/update-assignment.dto';
import { Query as ExpressQuery } from 'express-serve-static-core';
import { CreateQuestionDto, UpdateQuestionDto } from '../questions/dtos';
import { CreateResponseDto } from '../responses/dtos/create-response.dto';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { LoginUser } from 'src/common/decorators/login-user.decorator';
import { FileInterceptor } from '@nestjs/platform-express';
import { CloudinaryService } from '../cloudinary/cloudinary.service';
import { CreateMarkResponseDto } from '../responses/dtos/create-mark-response.dto';

@UseGuards(JwtAuthGuard)
@Controller('classes/:classId/assignment')
export class AssignmentController {
  constructor(
    private assignmentService: AssignmentService,
    private readonly cloudinaryService: CloudinaryService,
  ) {}

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

  @Post('/:id/response/test')
  async createATestResponse(
    @LoginUser() user,
    @Param('id') assignmentId: string,
    @Param('classId') classId: string,
    @Body() dto: CreateResponseDto[],
  ) {
    return this.assignmentService.createATestResponse(
      user._id,
      classId,
      assignmentId,
      dto,
    );
  }

  @Post('/:id/response/upload')
  @UseInterceptors(
    FileInterceptor('file', {
      limits: {
        files: 1,
        fileSize: 10 * 1024 * 1024,
      },
    }),
  )
  async createAUploadResponse(
    @LoginUser() user,
    @Param('id') assignmentId: string,
    @Param('classId') classId: string,
    @UploadedFile() file: Express.Multer.File,
  ) {
    const res = await this.cloudinaryService.uploadImageToCloudinary(
      file,
      'assignments',
    );
    return this.assignmentService.createAUploadResponse(
      user._id,
      classId,
      assignmentId,
      { url: res.secure_url, format: res.format },
    );
  }

  @Get('/:id/response')
  async getAResponse(
    @LoginUser() user,
    @Param('id') assignmentId: string,
    @Param('classId') classId: string,
    @Query() query: ExpressQuery,
  ) {
    return this.assignmentService.getAResponses(
      user._id,
      classId,
      assignmentId,
      query,
    );
  }

  @Get('/:id/responses')
  async getAllAResponses(
    @Param('id') assignmentId: string,
    @Param('classId') classId: string,
  ) {
    return this.assignmentService.getAllAResposes(classId, assignmentId);
  }

  @Get('/:id/responses/:responseId')
  async getAResponseById(
    @Param('id') assignmentId: string,
    @Param('classId') classId: string,
    @Param('responseId') responseId: string,
  ) {
    return this.assignmentService.getAResponseById(
      classId,
      assignmentId,
      responseId,
    );
  }

  @Post('/:id/responses/:responseId/mark')
  async markResponse(
    @Param('id') assignmentId: string,
    @Param('classId') classId: string,
    @Param('responseId') responseId: string,
    @Body() dto: CreateMarkResponseDto,
  ) {
    return this.assignmentService.markResponse(
      classId,
      assignmentId,
      responseId,
      dto,
    );
  }
}
