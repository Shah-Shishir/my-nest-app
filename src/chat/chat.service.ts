import { Injectable } from '@nestjs/common';
import { WebSocketServer } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

// Interfaces
import { CreateChatDto } from './dto/create-chat.dto';
import { UpdateChatDto } from './dto/update-chat.dto';
import { JoinedUserDto } from './dto/joined-user.dto';

// Constants
import { ServerEvents } from 'src/constants/chat.constant';

@Injectable()
export class ChatService {
  onlineUsers: JoinedUserDto[] = [];

  joinChat(username: string, socket: Socket) {
    // Create the joinedUser instance with necessary data
    const joinedUser: JoinedUserDto = {
      id: socket.id,
      username,
      joinedAt: new Date().toISOString(),
    };

    // Add that user to the connectedUser Record
    this.onlineUsers.push(joinedUser);

    // Broadcast to other clients that a new user joined
    socket.broadcast.emit(ServerEvents.USER_JOINED, {
      joinedUser,
      message: `${joinedUser.username} joined!`,
      type: ServerEvents.USER_JOINED,
      onlineUsers: this.onlineUsers,
    });
  }

  leaveChat(username: string, socket: Socket) {
    // Delete the entry
    this.onlineUsers = this.onlineUsers.filter((user) => user.id !== socket.id);

    // Broadcast to other clients that an user left
    socket.broadcast.emit(ServerEvents.USER_LEFT, {
      message: `${username} left!`,
      type: ServerEvents.USER_LEFT,
      onlineUsers: this.onlineUsers,
    });
  }

  isTyping(username: string, socket: Socket) {
    // Broadcast to other clients that an user is typing
    socket.broadcast.emit(ServerEvents.IS_TYPING, {
      message: `${username} is typing!`,
      type: ServerEvents.IS_TYPING,
    });
  }

  create(createChatDto: CreateChatDto) {
    return 'This action adds a new chat';
  }

  findAll() {
    return `This action returns all chat`;
  }

  update(id: number, updateChatDto: UpdateChatDto) {
    return `This action updates a #${id} chat`;
  }

  remove(id: number) {
    return `This action removes a #${id} chat`;
  }
}
