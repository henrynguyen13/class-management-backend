import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Question } from './schemas/question.schema';
import mongoose from 'mongoose';
import { CreateQuestionDto } from './dtos';
import { IQuestion, QuestionType } from './questions.interface';

@Injectable()
export class QuestionsService {
  constructor(
    @InjectModel(Question.name)
    private questionModel: mongoose.Model<Question>,
  ) {}

  async createQuestion(dto: CreateQuestionDto): Promise<IQuestion> {
    const numOfCorrectAnswer = dto.answers.map(
      (answer) => answer.isCorrect === true,
    ).length;
    console.log('----', numOfCorrectAnswer);
    if (numOfCorrectAnswer > 1) {
      const updatedDto = { ...dto, type: QuestionType.MULTIPLE_CHOICE };
      return await this.questionModel.create(updatedDto);
    }
    return await this.questionModel.create(dto);
  }
}
