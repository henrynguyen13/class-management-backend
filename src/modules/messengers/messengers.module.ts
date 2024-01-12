import { Module } from '@nestjs/common';
import { MessengersService } from './messengers.service';
import { MessengersGateway } from './messengers.gateway';
import { MessengerSchema } from './schemas/messenger.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Messenger', schema: MessengerSchema }]),
  ],
  providers: [MessengersGateway, MessengersService],
})
export class MessengersModule {}
