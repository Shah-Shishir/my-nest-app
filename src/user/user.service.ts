import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
  ) {}

  create(createUserDto: CreateUserDto): Promise<User> {
    const newUser = this.usersRepository.create({
      username: createUserDto.username,
    });

    return this.usersRepository.save(newUser);
  }

  findAll(username: string): Promise<User[]> {
    if (username) {
    }

    return this.usersRepository.find();
  }

  async findOne(id: number): Promise<User> {
    try {
      const user = await this.usersRepository.findOneByOrFail({ id });
      return user;
    } catch (err) {
      throw new NotFoundException('User not found');
    }
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.findOne(id);
    const updatedUser = {
      ...user,
      ...updateUserDto, 
    };
    return this.usersRepository.save(updatedUser); 
  }

  async remove(id: number): Promise<User> {
    const user = await this.findOne(id);
    return this.usersRepository.remove(user);
  }
}

