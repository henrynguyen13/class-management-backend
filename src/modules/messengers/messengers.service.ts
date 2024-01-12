import { Injectable } from '@nestjs/common';
import { CreateMessengerDto } from './dto/create-messenger.dto';
import { UpdateMessengerDto } from './dto/update-messenger.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Message, Messenger } from './schemas/messenger.schema';
import mongoose from 'mongoose';

@Injectable()
export class MessengersService {
  constructor(
    @InjectModel(Messenger.name)
    private messengerModel: mongoose.Model<Messenger>,
  ) {}

  messages: Message[] = [{ name: 'Khoa', text: 'Xin chao' }];
  clientToUser = {};
  identify(name: string, clientId: string) {
    this.clientToUser[clientId] = name;
    return Object.values(this.clientToUser);
  }

  create(createMessengerDto: CreateMessengerDto, clientId: string) {
    const message = {
      name: this.clientToUser[clientId],
      text: createMessengerDto.text,
    };
    this.messages.push(message);
    return message;
  }

  findAll() {
    return this.messages;
  }

  async getClientName(clientId: string) {
    return this.clientToUser[clientId];
  }

  // findOne(id: number) {
  //   return `This action returns a #${id} messenger`;
  // }

  // update(id: number, updateMessengerDto: UpdateMessengerDto) {
  //   return `This action updates a #${id} messenger`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} messenger`;
  // }
}
