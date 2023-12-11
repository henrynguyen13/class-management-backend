import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ClassService } from './class.service';
import { Query as ExpressQuery } from 'express-serve-static-core';
import { Class } from './schemas/class.schema';
import { CreateClassDto } from './dtos/create-class.dto';
import { IClass, IUpdateClass } from './class.interface';
import { AddStudentDto } from './dtos/add-student.dto';
import { User } from '../users/schemas/user.schema';
import { IBodyResponse, IGetListResponse } from 'src/common/common.interface';
import { RoleGuard } from 'src/common/guards/role.guard';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { Roles } from 'src/common/decorators/role.decorator';
import { AuthGuard } from '@nestjs/passport';
@Controller('classes')
@UseGuards(JwtAuthGuard, RoleGuard)
export class ClassController {
  constructor(private classService: ClassService) {}

  @Roles('teacher')
  @Get()
  async getAllClasses(
    @Query() query: ExpressQuery,
  ): Promise<{ data: IGetListResponse<Class> }> {
    return this.classService.findAll(query);
  }

  @Get('/my/:userId')
  async getAllMyClasses(
    @Param('userId') userId: string,
    @Query() query: ExpressQuery,
  ) {
    return this.classService.findAllMyClass(userId, query);
  }
  @Get('/:id')
  async getClassById(@Param('id') id: string) {
    return this.classService.findById(id);
  }

  @Roles('teacher')
  @Post('')
  async createClass(@Body() body: CreateClassDto, @Req() req): Promise<Class> {
    return this.classService.createClass(body, [req.user]);
  }

  @Roles('teacher')
  @Patch('/:id')
  async updateClass(
    @Param('id') id: string,
    @Body() body: IUpdateClass,
  ): Promise<Class> {
    return this.classService.updateClassById(id, body);
  }

  @Roles('teacher')
  @Delete('/:id')
  async deleteClass(@Param('id') id: string): Promise<Class> {
    return this.classService.deleteClass(id);
  }

  @Roles('teacher')
  @Post('/:id/students')
  async addStudent(
    @Param('id') id: string,
    @Body() body: AddStudentDto,
  ): Promise<Class> {
    return this.classService.addStudentToClass(id, body);
  }

  @Roles('teacher')
  @Delete('/:id/students/:studentId')
  async deleteStudent(
    @Param('id') id: string,
    @Param('studentId') studentId: string,
  ): Promise<Class> {
    return this.classService.deleteStudentFromClass(id, studentId);
  }

  @Roles('teacher')
  @Patch('/:id/open')
  async openClass(@Param('id') id: string): Promise<Class> {
    return this.classService.openClass(id);
  }

  @Roles('teacher')
  @Patch('/:id/close')
  async closeClass(@Param('id') id: string): Promise<Class> {
    return this.classService.closeClass(id);
  }
}
