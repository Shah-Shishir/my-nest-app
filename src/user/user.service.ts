import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  private users: User[] = [];

  create(createUserDto: CreateUserDto) {
    const newUser: User = {
      id: this.users.length + 1,
      username: createUserDto.username,
      createdAt: new Date()
    }
  }

  findAll() {
    return this.users;
  }

  findOne(id: number) {
    const foundUser = this.users.find((user) => id === +user.id);

    if (!foundUser) {
      return new NotFoundException();
    }

    return foundUser;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    const foundUser = this.users.find((user) => id === +user.id);

    if (!foundUser) {
      return new NotFoundException();
    }

    return {
      ...foundUser,
      username: updateUserDto.username,
      message: 'User has been updated successfully',
    };
  }

  remove(id: number) {
    const foundUser = this.users.find((user) => id === +user.id);

    if (!foundUser) {
      return new NotFoundException();
    }

    this.users = this.users.filter((user) => id === +user.id);

    return {
      message: 'User has been deleted successfully',
    };
  }
}
