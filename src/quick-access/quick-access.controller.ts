import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { QuickAccessService } from './quick-access.service';
import { CreateQuickAccessDto } from './dto/create-quick-access.dto';
import { UpdateQuickAccessDto } from './dto/update-quick-access.dto';

@Controller('quick-access')
export class QuickAccessController {
  constructor(private readonly quickAccessService: QuickAccessService) {}

  @Post()
  create(@Body() createQuickAccessDto: CreateQuickAccessDto) {
    return this.quickAccessService.create(createQuickAccessDto);
  }

  @Get()
  findAll() {
    return this.quickAccessService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.quickAccessService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateQuickAccessDto: UpdateQuickAccessDto) {
    return this.quickAccessService.update(+id, updateQuickAccessDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.quickAccessService.remove(+id);
  }
}
