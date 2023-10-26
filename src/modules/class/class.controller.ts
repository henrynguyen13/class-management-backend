import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ClassService } from './class.service';
import { AuthGuard } from '@nestjs/passport';
import { Query as ExpressQuery } from 'express-serve-static-core';
import { Class } from './schemas/class.schema';
import { CreateClassDto } from './dtos/create-class.dto';
import { IClass, IUpdateClass } from './class.interface';
import { AddStudentDto } from './dtos/add-student.dto';
import { User } from '../users/schemas/user.schema';
import { IGetListResponse } from 'src/common/common.interface';
@Controller('classes')
@UseGuards(AuthGuard())
export class ClassController {
  constructor(private classService: ClassService) {}

  @Get()
  async getAllClasses(
    @Query() query: ExpressQuery,
  ): Promise<IGetListResponse<Class>> {
    return this.classService.findAll(query);
  }

  @Get('/:id')
  async getClassById(@Param('id') id: string): Promise<IClass> {
    return this.classService.findById(id);
  }

  @Post('')
  async createClass(@Body() body: CreateClassDto, @Req() req): Promise<Class> {
    return this.classService.createClass(body, [req.user]);
  }

  @Put('/:id')
  async updateClass(
    @Param('id') id: string,
    @Body() body: IUpdateClass,
  ): Promise<Class> {
    return this.classService.updateClassById(id, body);
  }
  @Delete('/:id')
  async deleteClass(@Param('id') id: string): Promise<Class> {
    return this.classService.deleteClass(id);
  }

  @Post('/:id/students')
  async addStudent(
    @Param('id') id: string,
    @Body() body: AddStudentDto,
  ): Promise<Class> {
    return this.classService.addStudentToClass(id, body);
  }
}
