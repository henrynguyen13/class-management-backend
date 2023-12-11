import { Module } from '@nestjs/common';
import { AssignmentService } from './assignment.service';
import { AssignmentController } from './assignment.controller';
import { ClassModule } from '../class/class.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ClassSchema } from '../class/schemas/class.schema';
import { AssignmentSchema } from './schemas/assignment.schema';
import { QuestionsModule } from '../questions/questions.module';
import { QuestionSchema } from '../questions/schemas/question.schema';
import { ResponseSchema } from '../responses/schemas/response.schema';
import { CloudinaryService } from '../cloudinary/cloudinary.service';
@Module({
  imports: [
    ClassModule,
    QuestionsModule,
    MongooseModule.forFeature([
      { name: 'Assignment', schema: AssignmentSchema },
      { name: 'Class', schema: ClassSchema },
      { name: 'Question', schema: QuestionSchema },
      { name: 'Response', schema: ResponseSchema },
    ]),
  ],
  providers: [AssignmentService, CloudinaryService],
  controllers: [AssignmentController],
})
export class AssignmentModule {}
