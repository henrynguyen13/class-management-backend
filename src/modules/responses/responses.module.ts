import { Module } from '@nestjs/common';
import { ResponsesController } from './responses.controller';
import { ResponsesService } from './responses.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ResponseSchema } from './schemas/response.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Response', schema: ResponseSchema }]),
  ],
  controllers: [ResponsesController],
  providers: [ResponsesService],
})
export class ResponsesModule {}
