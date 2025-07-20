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
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';
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

  @SubscribeMessage(SubscribedMessages.SEND_MESSAGE)
  sendMessage(
    @MessageBody() createMessageDto: CreateMessageDto,
    @ConnectedSocket() socket: Socket,
  ) {
    return this.chatService.sendMessage(createMessageDto, socket);
  }

  @SubscribeMessage(SubscribedMessages.FIND_ALL_CHATS)
  findAllMessages() {
    return this.chatService.findAllMessages();
  }

  @SubscribeMessage(SubscribedMessages.UPDATE_MESSAGE)
  updateMessage(
    @MessageBody() updateMessageDto: UpdateMessageDto,
    @ConnectedSocket() socket: Socket,
  ) {
    return this.chatService.updateMessage(updateMessageDto, socket);
  }

  @SubscribeMessage(SubscribedMessages.REMOVE_MESSAGE)
  removeMessage(
    @MessageBody() messageId: string,
    @ConnectedSocket() socket: Socket,
  ) {
    return this.chatService.removeMessage(messageId, socket);
  }
}
