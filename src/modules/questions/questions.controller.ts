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
import { QuestionsService } from './questions.service';
import { CreateQuestionDto } from './dtos';
import { Question } from './schemas/question.schema';
import { IQuestion } from './questions.interface';

@Controller('questions')
export class QuestionsController {
  constructor(private questionService: QuestionsService) {}

  @Post('')
  async createQuestion(@Body() body: CreateQuestionDto): Promise<IQuestion> {
    return this.questionService.createQuestion(body);
  }
}
