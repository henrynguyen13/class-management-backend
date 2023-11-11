import { Body, Controller, Get, Param, Patch, Post, Req } from '@nestjs/common';
import { AssignmentService } from './assignment.service';
import { CreateAssignmentDto } from './dtos/create-assignment.dto';
import { Assignment } from './schemas/assignment.schema';
import { UpdateAssignmentDto } from './dtos/update-assignment.dto';

@Controller('classes/:classId/assignment')
export class AssignmentController {
  constructor(private assignmentService: AssignmentService) {}

  @Post('')
  async createAssignment(
    @Body() body: CreateAssignmentDto,
    @Param('classId') classId: string,
  ): Promise<Assignment> {
    return this.assignmentService.createAssignment(body, classId);
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
}
