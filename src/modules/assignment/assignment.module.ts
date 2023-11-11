import { Module } from '@nestjs/common';
import { AssignmentService } from './assignment.service';
import { AssignmentController } from './assignment.controller';
import { ClassModule } from '../class/class.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ClassSchema } from '../class/schemas/class.schema';
import { AssignmentSchema } from './schemas/assignment.schema';
import { QuestionsModule } from '../questions/questions.module';

@Module({
  imports: [
    ClassModule,
    QuestionsModule,
    MongooseModule.forFeature([
      { name: 'Assignment', schema: AssignmentSchema },
    ]),
    MongooseModule.forFeature([{ name: 'Class', schema: ClassSchema }]),
  ],
  providers: [AssignmentService],
  controllers: [AssignmentController],
})
export class AssignmentModule {}
