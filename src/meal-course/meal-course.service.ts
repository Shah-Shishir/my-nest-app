import { Injectable } from '@nestjs/common';
import { CreateMealCourseDto } from './dto/create-meal-course.dto';
import { UpdateMealCourseDto } from './dto/update-meal-course.dto';

@Injectable()
export class MealCourseService {
  create(createMealCourseDto: CreateMealCourseDto) {
    return 'This action adds a new mealCourse';
  }

  findAll() {
    return `This action returns all mealCourse`;
  }

  findOne(id: number) {
    return `This action returns a #${id} mealCourse`;
  }

  update(id: number, updateMealCourseDto: UpdateMealCourseDto) {
    return `This action updates a #${id} mealCourse`;
  }

  remove(id: number) {
    return `This action removes a #${id} mealCourse`;
  }
}
