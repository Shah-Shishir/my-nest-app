import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MealCourseService } from './meal-course.service';
import { CreateMealCourseDto } from './dto/create-meal-course.dto';
import { UpdateMealCourseDto } from './dto/update-meal-course.dto';

@Controller('meal-course')
export class MealCourseController {
  constructor(private readonly mealCourseService: MealCourseService) {}

  @Post()
  create(@Body() createMealCourseDto: CreateMealCourseDto) {
    return this.mealCourseService.create(createMealCourseDto);
  }

  @Get()
  findAll() {
    return this.mealCourseService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.mealCourseService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMealCourseDto: UpdateMealCourseDto) {
    return this.mealCourseService.update(+id, updateMealCourseDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.mealCourseService.remove(+id);
  }
}
