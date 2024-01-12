import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  WebSocketServer,
  ConnectedSocket,
} from '@nestjs/websockets';
import { MessengersService } from './messengers.service';
import { CreateMessengerDto } from './dto/create-messenger.dto';
import { UpdateMessengerDto } from './dto/update-messenger.dto';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class MessengersGateway {
  @WebSocketServer()
  server: Server;

  constructor(private readonly messengersService: MessengersService) {}

  @SubscribeMessage('createMessenger')
  async create(
    @MessageBody() createMessengerDto: CreateMessengerDto,
    @ConnectedSocket() client: Socket,
  ) {
    const message = await this.messengersService.create(
      createMessengerDto,
      client.id,
    );
    this.server.emit('message', message);
    return message;
  }

  @SubscribeMessage('findAllMessengers')
  findAll() {
    return this.messengersService.findAll();
  }

  @SubscribeMessage('join')
  joinRoom(
    @MessageBody('name') name: string,
    @ConnectedSocket() client: Socket,
  ) {
    return this.messengersService.identify(name, client.id);
  }

  @SubscribeMessage('typing')
  async typing(
    @MessageBody('isTyping') isTyping: boolean,
    @ConnectedSocket() client: Socket,
  ) {
    const name = await this.messengersService.getClientName(client.id);
    client.broadcast.emit('typing', { name, isTyping });
  }

  // @SubscribeMessage('findOneMessenger')
  // findOne(@MessageBody() id: number) {
  //   return this.messengersService.findOne(id);
  // }

  // @SubscribeMessage('updateMessenger')
  // update(@MessageBody() updateMessengerDto: UpdateMessengerDto) {
  //   return this.messengersService.update(
  //     updateMessengerDto.id,
  //     updateMessengerDto,
  //   );
  // }

  // @SubscribeMessage('removeMessenger')
  // remove(@MessageBody() id: number) {
  //   return this.messengersService.remove(id);
  // }
}
