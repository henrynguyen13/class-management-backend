import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';
import { ClassModule } from './modules/class/class.module';
import { AssignmentModule } from './modules/assignment/assignment.module';
import { QuestionsModule } from './modules/questions/questions.module';
import { ResponsesModule } from './modules/responses/responses.module';
import { CloudinaryModule } from './modules/cloudinary/cloudinary.module';
@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: '.env', isGlobal: true }),
    MongooseModule.forRoot(process.env.DB_URI),
    UsersModule,
    AuthModule,
    ClassModule,
    AssignmentModule,
    QuestionsModule,
    ResponsesModule,
    CloudinaryModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
