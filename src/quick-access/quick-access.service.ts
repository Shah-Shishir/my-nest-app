import { Injectable } from '@nestjs/common';
import { CreateQuickAccessDto } from './dto/create-quick-access.dto';
import { UpdateQuickAccessDto } from './dto/update-quick-access.dto';

@Injectable()
export class QuickAccessService {
  create(createQuickAccessDto: CreateQuickAccessDto) {
    return 'This action adds a new quickAccess';
  }

  findAll() {
    return `This action returns all quickAccess`;
  }

  findOne(id: number) {
    return `This action returns a #${id} quickAccess`;
  }

  update(id: number, updateQuickAccessDto: UpdateQuickAccessDto) {
    return `This action updates a #${id} quickAccess`;
  }

  remove(id: number) {
    return `This action removes a #${id} quickAccess`;
  }
}
