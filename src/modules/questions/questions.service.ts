import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Question } from './schemas/question.schema';
import mongoose from 'mongoose';
import { CreateQuestionDto } from './dtos';
import { IQuestion } from './questions.interface';

@Injectable()
export class QuestionsService {
  constructor(
    @InjectModel(Question.name)
    private questionModel: mongoose.Model<Question>,
  ) {}

  async createQuestion(dto: CreateQuestionDto): Promise<IQuestion> {
    return await this.questionModel.create(dto);
  }
}
