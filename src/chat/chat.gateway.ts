import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  WebSocketServer,
  ConnectedSocket,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

// Services
import { ChatService } from './chat.service';

// Interfaces
import { CreateChatDto } from './dto/create-chat.dto';
import { UpdateChatDto } from './dto/update-chat.dto';
import { JoinedUserDto } from './dto/joined-user.dto';

// Constants
import {
  Config,
  SubscribedMessages,
  ServerEvents,
} from 'src/constants/chat.constant';
import { CommonConstant } from 'src/constants/common.constant';

@WebSocketGateway(Config.PORT, {
  cors: {
    origin: CommonConstant.CLIENT_BASE_URL,
  },
})
export class ChatGateway {
  @WebSocketServer() server: Server;

  constructor(private readonly chatService: ChatService) {}

  @SubscribeMessage(SubscribedMessages.JOIN_CHAT)
  joinChat(@MessageBody() username: string, @ConnectedSocket() socket: Socket) {
    return this.chatService.joinChat(username, socket);
  }

  @SubscribeMessage(SubscribedMessages.LEAVE_CHAT)
  leaveChat(
    @MessageBody() username: string,
    @ConnectedSocket() socket: Socket,
  ) {
    return this.chatService.leaveChat(username, socket);
  }

  @SubscribeMessage(SubscribedMessages.IS_TYPING)
  isTyping(@MessageBody() username: string, @ConnectedSocket() socket: Socket) {
    return this.chatService.isTyping(username, socket);
  }

  @SubscribeMessage(SubscribedMessages.CREATE_CHAT)
  create(@MessageBody() createChatDto: CreateChatDto) {
    return this.chatService.create(createChatDto);
  }

  @SubscribeMessage(SubscribedMessages.FIND_ALL_CHATS)
  findAll() {
    return this.chatService.findAll();
  }

  @SubscribeMessage(SubscribedMessages.UPDATE_CHAT)
  update(@MessageBody() updateChatDto: UpdateChatDto) {
    return this.chatService.update(updateChatDto.id, updateChatDto);
  }

  @SubscribeMessage(SubscribedMessages.REMOVE_CHAT)
  remove(@MessageBody() id: number) {
    return this.chatService.remove(id);
  }
}
